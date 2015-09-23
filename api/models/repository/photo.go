package repository

import (
	"github.com/triitvn/instagram-go/api/db"
	"github.com/triitvn/instagram-go/api/models"
)

func CreatePhoto(photo *models.Photo) {
	db.Conn.Save(&photo)
}

func GetPhotosByUserId(userId int) []models.Photo {
	var photos []models.Photo
	db.Conn.Where(&models.Photo{UserId: userId}).Find(&photos)
	return photos
}

func GetPhotos() []models.Photo {
	var photos []models.Photo
	db.Conn.Order("created_at desc").Find(&photos)
	return photos
}

func GetPhotosByTag(tag string) []models.Photo {
	var photos []models.Photo
	var hashtag models.Hashtag
	db.Conn.Where(&models.Hashtag{Name: tag}).First(&hashtag)
	db.Conn.Model(&hashtag).Related(&photos, "Photos")
	return photos
}
