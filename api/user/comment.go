package user

import (
	"encoding/json"
	// "fmt"
	"github.com/triitvn/instagram-go/api/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/db"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"
)

type Comment struct {
	Id        int
	UserId    int
	PhotoId   int
	Content   string
	CreatedAt time.Time
	User      User `sql:"-"`
}

func PostComment(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	_photoId, _ := strconv.Atoi(vars["photoId"])

	c := Comment{}
	c.UserId, _ = strconv.Atoi(r.FormValue("userId"))
	c.PhotoId = _photoId
	c.Content = r.FormValue("content")

	u := User{
		Token: r.FormValue("token"),
	}

	db.Conn.Where(u).First(&u)

	c.UserId = u.Id
	c.User = u

	// Tag process
	rx, _ := regexp.Compile("#(?:[[^]]+]|\\S+)")
	tags := rx.FindAllString(c.Content, -1)

	for i := range tags {
		_name := strings.TrimPrefix(tags[i], "#")
		hashtag := Hashtag{Name: _name}
		// hashtag.Save()
		db.Conn.Debug().Where(hashtag).FirstOrCreate(&hashtag)
		db.Conn.Debug().Exec("INSERT INTO photo_hashtag (photo_id, hashtag_id) VALUES (?, ?)", _photoId, hashtag.Id)
	}

	db.Conn.Save(&c)

	json.NewEncoder(w).Encode(c)
}

func (c *Comment) TableName() string {
	return "comment"
}

func (c *Comment) AfterFind() (err error) {
	db.Conn.Model(&c).Related(&c.User, "UserId")
	return
}

func GetCommentsByPost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	photoId, _ := strconv.Atoi(vars["photoId"])
	comments := _getCommentsByPhotoId(photoId)
	json.NewEncoder(w).Encode(comments)
}

func _getCommentsByPhotoId(photoId int) []Comment {
	var comments []Comment
	db.Conn.Where(&Comment{PhotoId: photoId}).Find(&comments)
	return comments
}
