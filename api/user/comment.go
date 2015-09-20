package user

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/db"
	"net/http"
	"strconv"
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

	c := Comment{}
	c.UserId, _ = strconv.Atoi(r.FormValue("userId"))
	c.PhotoId, _ = strconv.Atoi(vars["photoId"])
	c.Content = r.FormValue("content")

	db.Conn.Save(&c)

	json.NewEncoder(w).Encode(c)
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

	for i := range comments {
		comments[i].User = _getUserById(comments[i].UserId)
	}

	return comments
}
