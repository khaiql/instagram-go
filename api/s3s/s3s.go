package s3s

import (
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/aws/aws-sdk-go/aws"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/aws/aws-sdk-go/service/s3"
	"github.com/triitvn/instagram-go/Godeps/_workspace/src/github.com/joho/godotenv"
	"log"
	"mime/multipart"
	"os"
)

var SVC *s3.S3
var BUCKET *string

func init() {
	godotenv.Load()
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	BUCKET = aws.String(os.Getenv("BUCKET"))

	SVC = s3.New(aws.NewConfig().WithRegion(os.Getenv("AWS_REGION")).WithS3ForcePathStyle(true))
}

func Test() {
	// LIST OBJECTS
	resp, err := SVC.ListObjects(&s3.ListObjectsInput{
		Bucket: BUCKET,
	})

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		log.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	log.Println(resp)
}

func Upload(file multipart.File, key string) bool {
	_, err := SVC.PutObject(&s3.PutObjectInput{
		Bucket: BUCKET,
		Key:    aws.String(key),
		ACL:    aws.String("public-read"),
		Body:   file,
	})

	if err != nil {
		return false
	}

	return true
}
