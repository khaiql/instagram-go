package main

import (
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/joho/godotenv"
	"github.com/triitvn/instagram-go/api/db"
	"github.com/triitvn/instagram-go/api/handlers"
	"github.com/triitvn/instagram-go/api/models/factory"
	"github.com/triitvn/instagram-go/api/s3s"
	"log"
	"net/http"
	"os"
)

func main() {
	defer db.Close()
	godotenv.Load()

	if os.Getenv("ENV") != "production" {
		factory.AutoMigrate()
		s3s.Test()
	} else {
		log.Println("Production")
	}

	// Route settings
	router := mux.NewRouter().StrictSlash(true)

	router.
		HandleFunc("/user", handlers.Register).
		Methods("POST")

	router.
		HandleFunc("/user/login", handlers.Login).
		Methods("GET")

	router.
		HandleFunc("/user/{userId}", handlers.GetUserById).
		Methods("GET")

	router.
		HandleFunc("/user/{userId}/photos", handlers.GetPhotosByUserId).
		Methods("GET")

	router.
		HandleFunc("/user/{userId}", handlers.UpdateUser).
		Methods("POST")

	router.
		HandleFunc("/photos", handlers.GetPhotos).
		Methods("GET")

	router.
		HandleFunc("/photo", handlers.PostPhoto).
		Methods("POST")

	router.
		HandleFunc("/photo/{photoId}/comment", handlers.CreateComment).
		Methods("POST")

	// Bind to a port and pass our router in
	http.Handle("/", &MyServer{router})

	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), nil))
}

type MyServer struct {
	r *mux.Router
}

func (m *MyServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	m.r.ServeHTTP(w, r)
}
