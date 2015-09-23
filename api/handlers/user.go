package handlers

import (
	"database/sql"
	"encoding/json"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/models"
	"github.com/triitvn/instagram-go/api/models/repository"
	"log"
	"net/http"
	"strconv"
	"time"
)

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userId, _ := strconv.Atoi(vars["userId"])
	user := repository.GetUserById(userId)

	// oldPassword := r.FormValue("oldPassword")
	// newPassword := r.FormValue("newPassword")

	// if oldPassword != "" && newPassword != "" {
	// 	result := updatePassword(&user, oldPassword, newPassword)

	// 	if result {
	// 		w.Write([]byte(`{"result":true}`))
	// 	} else {
	// 		w.Write([]byte(`{"result":false}`))
	// 	}

	// 	return
	// }

	// User is exist
	displayName := r.FormValue("displayName")
	email := r.FormValue("email")
	if displayName != "" {
		user.DisplayName = displayName
	}
	user.Email.Scan(email)

	repository.UpdateUser(&user)
	json.NewEncoder(w).Encode(user)
}

func GetUserById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userId, _ := strconv.Atoi(vars["userId"])

	// TODO validate userId is number
	user := repository.GetUserById(userId)

	json.NewEncoder(w).Encode(user)
}

func Register(w http.ResponseWriter, r *http.Request) {

	user := models.User{}

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

	createUserToken(&user)

	if err := repository.CreateUser(&user).Error; err != nil {
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(err)
		return
	}

	log.Println(user)

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

	user := models.User{Email: email, Password: password}

	if !repository.Login(&user) {
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte(`{"error":"Mat khau hoac email khong dung"}`))
		return
	}

	createUserToken(&user)
	repository.UpdateUser(&user)

	json.NewEncoder(w).Encode(user)
}

func createUserToken(u *models.User) {
	u.Token = strconv.Itoa(int(time.Now().Unix()))
	u.ExpiredTime = time.Now()
}
