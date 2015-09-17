package main

import (
	"github.com/gorilla/mux"
	"github.com/triitvn/instagram-go/api/user"
	"log"
	"net/http"
)

func main() {
	// Route settings
	router := mux.NewRouter().StrictSlash(true)
	router.
		HandleFunc("/user", user.GetAll).
		Methods("GET")
	router.HandleFunc("/user/register", user.Register)

	router.HandleFunc("/user/login", user.Login)
	router.HandleFunc("/user/login/validate", user.ValidateLogin)

	router.HandleFunc("/user/{userId}", user.GetUser)

	// Bind to a port and pass our router in
	http.Handle("/", &MyServer{router})
	log.Fatal(http.ListenAndServe(":3001", nil))
}

type MyServer struct {
	r *mux.Router
}

func (m *MyServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	m.r.ServeHTTP(w, r)
}
