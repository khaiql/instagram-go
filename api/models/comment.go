package models

import (
	"github.com/triitvn/instagram-go/api/db"
	"time"
)

type Comment struct {
	Id        int
	UserId    int
	PhotoId   int
	Content   string
	CreatedAt time.Time
	User      User
}

func (c *Comment) AfterFind() (err error) {
	db.Conn.Model(&c).Related(&c.User, "UserId")
	return
}
