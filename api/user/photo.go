package user

import (
	"encoding/json"
	// "fmt"
	"github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/db"
	"net/http"
	"strconv"
	"time"
)

type Photo struct {
	Id        int    `sql:"AUTO_INCREMENT"`
	Url       string `sql:"type:varchar(200)"`
	CreatedAt time.Time
	User      User      `sql:"-"`
	UserId    int       `sql:"index"`
	Comments  []Comment `sql:"-"`
	Hashtags  []Hashtag `gorm:"many2many:photo_hashtag;"` // ! Do not put sql:"-"
}

func (p *Photo) TableName() string {
	return "photo"
}

func (p *Photo) AfterFind() (err error) {
	db.Conn.Model(&p).
		Related(&p.User, "UserId").
		Related(&p.Comments).
		Related(&p.Hashtags, "Hashtags")

	return
}

type Hashtag struct {
	Id     int     `sql:"AUTO_INCREMENT"`
	Name   string  `sql:"unique"`
	Photos []Photo `gorm:"many2many:photo_hashtag;"`
}

func (h *Hashtag) TableName() string {
	return "hashtag"
}

func GetUserPhotos(w http.ResponseWriter, r *http.Request) {
	var photos []Photo
	vars := mux.Vars(r)
	userId, _ := strconv.Atoi(vars["userId"])
	db.Conn.Where(&Photo{UserId: userId}).Find(&photos)
	json.NewEncoder(w).Encode(photos)
}

func GetPhotos(w http.ResponseWriter, r *http.Request) {
	var photos []Photo
	var tag = r.FormValue("tag")

	if tag != "" {
		var hashtag Hashtag
		db.Conn.Where(&Hashtag{Name: tag}).First(&hashtag)
		db.Conn.Model(&hashtag).Related(&photos, "Photos")
	} else {
		db.Conn.Find(&photos)
	}

	json.NewEncoder(w).Encode(photos)
}
