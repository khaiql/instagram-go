package repository

import (
	"github.com/triitvn/instagram-go/api/db"
	"github.com/triitvn/instagram-go/api/models"
)

func CreateComment(c *models.Comment) {
	db.Conn.Save(&c)
}
