package db

import (
	_ "github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/go-sql-driver/mysql"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/jinzhu/gorm"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/joho/godotenv"
	"log"
	"os"
	"strings"
)

var Conn gorm.DB

func init() {
	godotenv.Load()

	connString := getStandardizedConnStr(os.Getenv("CLEARDB_DATABASE_URL"))
	// log.Println(connString)

	Conn, _ = gorm.Open("mysql", connString)
	Conn.SingularTable(true)
	log.Println(Conn.DB().Ping())

	if os.Getenv("ENV") != "production" {
		Conn.LogMode(true)
	}
}

func getStandardizedConnStr(connString string) string {
	connString = strings.TrimPrefix(connString, "mysql://")

	_connStringParts := strings.Split(connString, "@")
	_account := _connStringParts[0]
	_addresses := strings.Split(_connStringParts[1], "/")
	_host := _addresses[0]
	_db := strings.Split(_addresses[1], "?")[0]

	return (_account + "@" + "tcp(" + _host + ":3306)/" + _db + "?charset=utf8&parseTime=True")
}

func Close() {
	Conn.Close()
}
