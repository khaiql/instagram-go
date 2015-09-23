package repository

import (
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/jinzhu/gorm"
	"github.com/triitvn/instagram-go/api/db"
	. "github.com/triitvn/instagram-go/api/models"
)

func CreateUser(user *User) *gorm.DB {
	return db.Conn.Create(&user)
}

func Login(user *User) bool {
	db.Conn.Where(&User{Email: user.Email, Password: user.Password}).First(&user)
	return user.Id != 0
}

func UpdateUser(user *User) *gorm.DB {
	return db.Conn.Save(&user)
}

// TODO check user token
func GetUserById(id int) User {
	var u User
	db.Conn.Where(&User{Id: id}).First(&u)
	return u
}

func GetUserByToken(token string) User {
	var u User
	db.Conn.Where(&User{Token: token}).First(&u)
	return u
}
