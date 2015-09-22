package user

import (
	"encoding/json"
	// "fmt"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/db"
	"io"
	"net/http"
	"os"
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

func UploadPhoto(w http.ResponseWriter, r *http.Request) {
	// the FormFile function takes in the POST input id file
	file, header, _ := r.FormFile("file")
	out, _ := os.Create("uploads/" + header.Filename)
	defer out.Close()
	io.Copy(out, file)

	// Get user
	u := User{
		Token: r.FormValue("token"),
	}
	db.Conn.Where(u).First(&u)

	// Save photo
	photo := Photo{
		Url:       header.Filename,
		CreatedAt: time.Now(),
		UserId:    u.Id,
	}

	db.Conn.Debug().Save(&photo)
	json.NewEncoder(w).Encode(photo)
}

func (p *Photo) TableName() string {
	return "photo"
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
		db.Conn.Order("created_at desc").Find(&photos)
	}

	json.NewEncoder(w).Encode(photos)
}
