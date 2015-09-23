package handlers

import (
	"encoding/json"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/models"
	"github.com/triitvn/instagram-go/api/models/repository"
	"net/http"
	"regexp"
	"strconv"
	"strings"
)

func CreateComment(w http.ResponseWriter, r *http.Request) {

	// Verify user

	u := repository.GetUserByToken(r.FormValue("token"))

	// Create

	vars := mux.Vars(r)
	_photoId, _ := strconv.Atoi(vars["photoId"])

	c := models.Comment{}
	c.UserId, _ = strconv.Atoi(r.FormValue("userId"))
	c.PhotoId = _photoId
	c.Content = r.FormValue("content")
	c.UserId = u.Id
	c.User = u

	_processTags(c.Content, _photoId)

	repository.CreateComment(&c)

	json.NewEncoder(w).Encode(c)
}

func _processTags(content string, photoId int) {
	rx, _ := regexp.Compile("#(?:[[^]]+]|\\S+)")
	tags := rx.FindAllString(content, -1)

	for i := range tags {
		_name := strings.TrimPrefix(tags[i], "#")
		hashtag := models.Hashtag{Name: _name}
		repository.CreateHashtag(&hashtag, photoId)
	}
}
