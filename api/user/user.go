package user

import (
	// "crypto/md5"
	"encoding/json"
	// "fmt"
	"github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/db"
	"net/http"
	"strconv"
	"time"
)

type User struct {
	Id          int
	Name        string
	Email       string
	Password    string
	Session     string
	ExpiredTime time.Time
}

func GetAll(w http.ResponseWriter, r *http.Request) {
	var users []User
	db.Conn.Find(&users)
	// fmt.Printf("%T", r)
	json.NewEncoder(w).Encode(users)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
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
		Name:     r.FormValue("name"),
		Email:    r.FormValue("email"),
		Password: r.FormValue("password"),
	}

	db.Conn.Create(&user)
	json.NewEncoder(w).Encode(user)
}

func Login(w http.ResponseWriter, r *http.Request) {
	email := r.FormValue("email")
	password := r.FormValue("password")

	user := User{}
	db.Conn.Where("email = ? and password = ?", email, password).First(&user)

	if user.Id != 0 {
		user.Session = strconv.Itoa(int(time.Now().Unix()))
		user.ExpiredTime = time.Now()
		db.Conn.Save(&user)
	}

	json.NewEncoder(w).Encode(user)
}

func ValidateLogin(w http.ResponseWriter, r *http.Request) {
	session := r.FormValue("session")
	user := User{}
	db.Conn.Where("session = ?", session).First(&user)
	json.NewEncoder(w).Encode(user)
}
