package posts

import (
	"database/sql"
	"fmt"
)

// can change the name of imageContent in db to imgPath
type Post struct {
	PostID int `json:"postID"`
	UserID int `json:"userID"`
	TextContent string `json:"textContent"`
	ImagePath string `json:"imgPath"`
	CreatedAt string `json:"createdAt"`
	Privacy string `json:"privacy"`
}


func CreatePost(db *sql.DB, textContent string, postPrivacy string, imgPath string) {
	//stmt, err := db.Prepare("INSERT INTO posts (username, postTitle, postContent, categories, creationDate) 
	//VALUES (?, ?, ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))")
	stmt, err := db.Prepare("INSERT INTO wallPosts (userID,textContent, privacy, imagePath, createdAt) VALUES (1, ?, ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))")

	if err != nil {
		fmt.Printf("error preparing create post statement: %v", err)
	}

	res, err2 := stmt.Exec(textContent, postPrivacy, imgPath)

	if err2 != nil {
		fmt.Printf("error adding post into database: %v", err2)
	}
	
	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("rows affected: ", rowsAff)
	fmt.Println("last inserted id: ", LastIns)
}