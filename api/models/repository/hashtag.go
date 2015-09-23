package repository

import (
	"github.com/triitvn/instagram-go/api/db"
	"github.com/triitvn/instagram-go/api/models"
)

func CreateHashtag(h *models.Hashtag, photoId int) {
	db.Conn.Where(h).FirstOrCreate(&h)

	photo_hashtag := models.Photo_Hashtag{
		PhotoId:   photoId,
		HashtagId: h.Id,
	}

	db.Conn.Where(photo_hashtag).FirstOrCreate(&photo_hashtag)
}
