package db

import (
	// "database/sql"
	// "fmt"
	_ "github.com/triitvn/instagram-go/api/Godeps/_workspace/src/github.com/go-sql-driver/mysql"
	"github.com/triitvn/instagram-go/api/Godeps/_workspace/src/github.com/jinzhu/gorm"
)

var connString = "root:123456@/instagram?charset=utf8&parseTime=True"
var Conn, _ = gorm.Open("mysql", connString)

func init() {
	// fmt.Printf("[db package]")

	// type User struct{} // struct User's database table name is "users" by default, will be "user" if you disabled pluralisation
	Conn.SingularTable(true)
}
