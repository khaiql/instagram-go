package handlers

import (
	"encoding/json"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/joho/godotenv"
	"github.com/triitvn/instagram-go/api/models"
	"github.com/triitvn/instagram-go/api/models/repository"
	"github.com/triitvn/instagram-go/api/s3s"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

func init() {
	godotenv.Load()
}

func PostPhoto(w http.ResponseWriter, r *http.Request) {
	// the FormFile function takes in the POST input id file
	file, header, _ := r.FormFile("file")
	bits := strings.Split(header.Filename, ".")
	fileExt := bits[len(bits)-1]
	fileName := strconv.Itoa(int(time.Now().Unix())) + "." + fileExt

	uploadResult := s3s.Upload(file, fileName)

	if !uploadResult {
		log.Fatalln("Failed to upload")
	} else {
		log.Println("Uploaded")
	}

	// Get user
	u := repository.GetUserByToken(r.FormValue("token"))

	url := "http://" + os.Getenv("BUCKET") + ".s3-website-" + os.Getenv("AWS_REGION") + ".amazonaws.com/" + fileName

	// Save photo
	photo := models.Photo{
		Url:       url,
		CreatedAt: time.Now(),
		UserId:    u.Id,
		User:      u,
	}

	repository.CreatePhoto(&photo)
	json.NewEncoder(w).Encode(photo)
}

func GetPhotosByUserId(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userId, _ := strconv.Atoi(vars["userId"])
	photos := repository.GetPhotosByUserId(userId)
	json.NewEncoder(w).Encode(photos)
}

func GetPhotos(w http.ResponseWriter, r *http.Request) {
	var photos []models.Photo
	var tag = r.FormValue("tag")

	if tag != "" {
		photos = repository.GetPhotosByTag(tag)
	} else {
		photos = repository.GetPhotos()
	}

	json.NewEncoder(w).Encode(photos)
}
