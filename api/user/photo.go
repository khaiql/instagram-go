package user

import (
	"encoding/json"
	// "fmt"
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
	UserId    int `sql:"index"` // Foreign key (belongs to), tag `index` will create index for this field when using AutoMigrate
}

func GetPhotos(w http.ResponseWriter, r *http.Request) {
	var photos []Photo
	vars := mux.Vars(r)
	userId, _ := strconv.Atoi(vars["userId"])
	db.Conn.Debug().Where(&Photo{UserId: userId}).Find(&photos)
	json.NewEncoder(w).Encode(photos)
}
