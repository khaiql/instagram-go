package user

import (
	"encoding/json"
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
	UserId    int       `sql:"index"` // Foreign key (belongs to), tag `index` will create index for this field when using AutoMigrate
	User      *User     `sql:"-"`
	Comments  []Comment `sql:"-"`
	Hashtags  []Hashtag `gorm:"many2many:photo_hashtag;"`
}

type Hashtag struct {
	Id   int    `sql:"AUTO_INCREMENT"`
	Name string `sql:"unique"`
}

func GetUserPhotos(w http.ResponseWriter, r *http.Request) {
	var photos []Photo
	vars := mux.Vars(r)
	userId, _ := strconv.Atoi(vars["userId"])
	db.Conn.Debug().Where(&Photo{UserId: userId}).Find(&photos)

	// TODO optimize this
	var user User

	db.Conn.Debug().Where(&User{Id: userId}).First(&user)

	for i := range photos {
		photos[i].User = &user
		photos[i].Comments = _getCommentsByPhotoId(photos[i].Id)
	}

	json.NewEncoder(w).Encode(photos)
}

func _getPhotoById(id int) Photo {
	_photo := Photo{}
	db.Conn.Where(&Photo{Id: id}).First(&_photo)
	return _photo
}

func GetPhotos(w http.ResponseWriter, r *http.Request) {
	var photos []Photo
	db.Conn.Debug().Find(&photos)

	for i := range photos {
		user := _getUserById(photos[i].UserId)
		photos[i].User = &user
		photos[i].Comments = _getCommentsByPhotoId(photos[i].Id)
	}

	json.NewEncoder(w).Encode(photos)
}
