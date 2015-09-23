package models

type Photo_Hashtag struct {
	PhotoId   int `gorm:"primary_key" sql:"primary_key"`
	HashtagId int `gorm:"primary_key" sql:"primary_key"`
}

func (p Photo_Hashtag) TableName() string {
	return "photo_hashtag"
}
