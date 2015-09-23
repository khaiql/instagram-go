package factory

import (
	"github.com/triitvn/instagram-go/api/db"
	. "github.com/triitvn/instagram-go/api/models"
)

func AutoMigrate() {
	db.Conn.DropTableIfExists(&User{})
	db.Conn.DropTableIfExists(&Photo{})
	db.Conn.DropTableIfExists(&Comment{})
	db.Conn.DropTableIfExists(&Hashtag{})
	db.Conn.DropTableIfExists(&Photo_Hashtag{})

	db.Conn.AutoMigrate(&User{}, &Photo{}, &Comment{}, &Hashtag{})

	user1 := User{}
	user1.DisplayName = "Tri Truong"
	user1.Email.Scan("tri.itvn@gmail.com")
	user1.Password = "123456"

	user2 := User{}
	user2.DisplayName = "Lan Xuan"
	user2.Email.Scan("xuanlan@gmail.com")
	user2.Password = "123456"

	tag1 := Hashtag{Name: "tag1"}
	tag2 := Hashtag{Name: "tag2"}
	tag3 := Hashtag{Name: "tag3"}
	tag4 := Hashtag{Name: "tag4"}
	tag5 := Hashtag{Name: "tag5"}

	comment1 := Comment{Content: "comment1", UserId: user1.Id}
	comment2 := Comment{Content: "comment2", UserId: user2.Id}
	comment3 := Comment{Content: "comment3", UserId: user1.Id}
	comment4 := Comment{Content: "comment4", UserId: user2.Id}

	photo1 := Photo{}
	photo1.Url = "https://farm1.staticflickr.com/499/19728341563_3a9d97e5e1_b.jpg"
	photo1.Hashtags = []Hashtag{tag1, tag2}
	photo1.Comments = []Comment{comment1, comment2}

	photo2 := Photo{}
	photo2.Url = "https://farm1.staticflickr.com/322/20355372211_51c56230e1_b.jpg"
	photo2.Hashtags = []Hashtag{tag3, tag4}
	photo2.Comments = []Comment{comment3}

	photo3 := Photo{}
	photo3.Url = "https://farm1.staticflickr.com/489/20161276708_ec57390500_b.jpg"
	photo3.Hashtags = []Hashtag{tag5}
	photo3.Comments = []Comment{comment4}

	user1.Photos = []Photo{photo1, photo2}
	user2.Photos = []Photo{photo3}

	db.Conn.Create(&user1)
	db.Conn.Create(&user2)
}
