package models

import (
	"github.com/triitvn/instagram-go/api/db"
	"time"
)

type Photo struct {
	Id        int    `sql:"AUTO_INCREMENT"`
	Url       string `sql:"type:varchar(200)"`
	CreatedAt time.Time
	User      User
	UserId    int `sql:"index"`
	Comments  []Comment
	Hashtags  []Hashtag `gorm:"many2many:photo_hashtag;"` // ! Do not put sql:"-"
}

func (p *Photo) AfterFind() (err error) {
	db.Conn.Model(&p).
		Related(&p.User, "UserId")

	db.Conn.Model(&p).
		Order("id desc").
		Related(&p.Comments)

	db.Conn.Model(&p).
		Order("name").
		Related(&p.Hashtags, "Hashtags")

	return
}
