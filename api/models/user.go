package models

import (
	"database/sql"
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
