package comment

import (
	"database/sql"
	"fmt"
)

type Comment struct {
	CommentId int `json:"commentID"`
	PostID int `json:"postID"`
	UserID int `json:"userID"`
	CreatedAt string `json:"date"`
	TextContent string `json:"textContent"`
	ImageContent string `json:"imageContent"`
}


// eventually need to add postId and userId as arguements
func StoreComment(db *sql.DB, textContent string, imgPath string) {
	stmt, err := db.Prepare(`INSERT INTO comments (postID, userID, textContent, imageContent, createdAt) 
	VALUES (1, 1, ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))`)

	if err != nil {
		fmt.Printf("error with storecomment insert statement:%v", err)
	}

	res, err2 := stmt.Exec(textContent, imgPath)

	if err2 != nil {
		fmt.Printf("error adding comment into database: %v", err2)
	}
	
	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("rows affected: ", rowsAff)
	fmt.Println("last inserted id: ", LastIns)
}