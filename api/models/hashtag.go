package models

type Hashtag struct {
	Id     int     `sql:"AUTO_INCREMENT"`
	Name   string  `sql:"unique"`
	Photos []Photo `gorm:"many2many:photo_hashtag;"`
}
