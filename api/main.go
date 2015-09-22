package main

import (
	"github.com/joho/godotenv"
	"github.com/triitvn/instagram-go/api/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/user"
	"log"
	"net/http"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Route settings
	router := mux.NewRouter().StrictSlash(true)

	router.
		HandleFunc("/user", user.GetAll).
		Methods("GET")

	router.
		HandleFunc("/user", user.Register).
		Methods("POST")

	router.HandleFunc("/user/login", user.Login)

	router.HandleFunc("/user/login/validate", user.ValidateLogin)

	router.
		HandleFunc("/user/{userId}", user.Get).
		Methods("GET")

	router.
		HandleFunc("/user/{userId}", user.Update).
		Methods("POST")

	router.
		HandleFunc("/user/{userId}/photos", user.GetUserPhotos).
		Methods("GET")

	router.
		HandleFunc("/photos", user.GetPhotos).
		Methods("GET")

	router.
		HandleFunc("/photo", user.UploadPhoto).
		Methods("POST")

	router.
		HandleFunc("/photo/{photoId}/comment", user.PostComment).
		Methods("POST")

	router.
		HandleFunc("/photo/{photoId}/comment", user.GetCommentsByPost).
		Methods("GET")

	// Bind to a port and pass our router in
	http.Handle("/", &MyServer{router})
	log.Fatal(http.ListenAndServe(":3001", nil))
}

type MyServer struct {
	r *mux.Router
}

func (m *MyServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	m.r.ServeHTTP(w, r)
}
