package user

import (
	// "crypto/md5"
	"encoding/json"
	// "fmt"
	"database/sql"
	"github.com/triitvn/instagram-go/api/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/db"
	"net/http"
	"strconv"
	"time"
)

type User struct {
	Id          int            `sql:"AUTO_INCREMENT"`
	DisplayName string         `sql:"type:varchar(100)"`
	Email       sql.NullString `sql:"type:varchar(100);unique_index"`
	Password    string         `sql:"type:varchar(100)" json:"-"`
	Token       string         `sql:"type:varchar(100)"`
	ExpiredTime time.Time
	Photos      []Photo
}

func Update(w http.ResponseWriter, r *http.Request) {
	var user User
	vars := mux.Vars(r)
	userId, _ := strconv.Atoi(vars["userId"])

	db.Conn.Where(&User{Id: userId}).First(&user)

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

	updateValues.Email.Scan(email)

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
	userId, _ := strconv.Atoi(vars["userId"])

	// TODO validate userId is number
	user := _getUserById(userId)

	// w.Header().Set("Server", "A Go Web Server")
	// w.WriteHeader(200)
	json.NewEncoder(w).Encode(user)
}

func _getUserById(id int) User {
	var u User
	db.Conn.Where(&User{Id: id}).First(&u)

	return u
}

func _getUserByToken(token string) User {
	var u User
	db.Conn.Where(&User{Token: token}).First(&u)

	return u
}

func Register(w http.ResponseWriter, r *http.Request) {

	user := User{}

	if r.FormValue("displayName") != "" {
		user.DisplayName = r.FormValue("displayName")
	} else {
		user.DisplayName = "NULL"
	}

	_email := r.FormValue("email")
	if _email != "" {
		user.Email.Scan(_email)
	}

	if r.FormValue("password") != "" {
		user.Password = r.FormValue("password")
	} else {
		user.Password = "NULL"
	}

	user.createSession()

	if err := db.Conn.Debug().Create(&user).Error; err != nil {
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
	var email sql.NullString
	email.Scan(r.FormValue("email"))
	password := r.FormValue("password")

	user := User{}
	db.Conn.Where(&User{Email: email, Password: password}).First(&user)

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
	db.Conn.Where(&User{Token: token}).First(&user)
	json.NewEncoder(w).Encode(user)
}

//---

func (u *User) createSession() {
	u.Token = strconv.Itoa(int(time.Now().Unix()))
	u.ExpiredTime = time.Now()
}
