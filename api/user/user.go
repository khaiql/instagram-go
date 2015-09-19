package user

import (
	// "crypto/md5"
	"encoding/json"
	// "fmt"
	"github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/db"
	"net/http"
	"strconv"
	"time"
)

type User struct {
	Id          int    `sql:"AUTO_INCREMENT"`
	DisplayName string `sql:"type:varchar(100)"`
	Email       string `sql:"type:varchar(100);unique_index"`
	Password    string `sql:"type:varchar(100)" json:"-"`
	Token       string `sql:"type:varchar(100)"`
	ExpiredTime time.Time
	Photos      []Photo
}

type Photo struct {
	Id        int    `sql:"AUTO_INCREMENT"`
	Url       string `sql:"type:varchar(200)"`
	CreatedAt time.Time
	UserId    int `sql:"index"` // Foreign key (belongs to), tag `index` will create index for this field when using AutoMigrate
}

func Update(w http.ResponseWriter, r *http.Request) {
	var user User
	vars := mux.Vars(r)
	userId := vars["userId"]

	db.Conn.Where("id = ?", userId).First(&user)

	oldPassword := r.FormValue("oldPassword")
	newPassword := r.FormValue("newPassword")

	if oldPassword != "" && newPassword != "" {
		result := updatePassword(&user, oldPassword, newPassword)

		if result {
			w.Write([]byte(`{"result":true}`))
		} else {
			w.Write([]byte(`{"result":false}`))
		}

		return
	}

	updateValues := User{}

	// User is exist
	displayName := r.FormValue("displayName")
	email := r.FormValue("email")

	if displayName != "" {
		updateValues.DisplayName = displayName
	}

	if email != "" {
		updateValues.Email = email
	}

	db.Conn.Model(&user).UpdateColumns(updateValues)

	json.NewEncoder(w).Encode(user)
}

func updatePassword(user *User, oldPassword string, newPassword string) bool {
	if user.Password != oldPassword {
		return false
	}

	db.Conn.Model(&user).UpdateColumn("Password", newPassword)
	return true
}

func GetAll(w http.ResponseWriter, r *http.Request) {
	var users []User
	db.Conn.Find(&users)
	// fmt.Printf("%T", r)
	json.NewEncoder(w).Encode(users)
}

func Get(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userId := vars["userId"]

	// TODO validate userId is number
	var user User
	db.Conn.Where("id = ?", userId).First(&user)

	// w.Header().Set("Server", "A Go Web Server")
	// w.WriteHeader(200)
	json.NewEncoder(w).Encode(user)
}

func Register(w http.ResponseWriter, r *http.Request) {

	user := User{
		DisplayName: r.FormValue("name"),
		Email:       r.FormValue("email"),
		Password:    r.FormValue("password"),
	}

	user.createSession()

	if err := db.Conn.Create(&user).Error; err != nil {
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(err)
		return
	}

	json.NewEncoder(w).Encode(user)
}

// Input: email string, password string
// Output:
// - Success: session string
// - Failed: {}
func Login(w http.ResponseWriter, r *http.Request) {
	email := r.FormValue("email")
	password := r.FormValue("password")

	user := User{}
	db.Conn.Where("email = ? and password = ?", email, password).First(&user)

	if user.Id == 0 {
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte(`{"error":"Mat khau hoac email khong dung"}`))
		return
	}

	user.createSession()
	db.Conn.Save(&user)

	json.NewEncoder(w).Encode(user)
}

func ValidateLogin(w http.ResponseWriter, r *http.Request) {
	token := r.FormValue("token")
	user := User{}
	db.Conn.Where("token = ?", token).First(&user)
	json.NewEncoder(w).Encode(user)
}

//---

func (u *User) createSession() {
	u.Token = strconv.Itoa(int(time.Now().Unix()))
	u.ExpiredTime = time.Now()
}
