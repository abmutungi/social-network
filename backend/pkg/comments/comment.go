package comment

import (
	"database/sql"
	"fmt"
)

type Comment struct {
	CommentId    int    `json:"commentID"`
	PostID       int    `json:"postID"`
	UserID       int    `json:"userID"`
	CreatedAt    string `json:"date"`
	TextContent  string `json:"textContent"`
	ImageContent string `json:"imageContent"`
	FName        string `json:"name"`
}

// eventually need to add postId and userId as arguements
func StoreComment(db *sql.DB, postID int, textContent string, imgPath string) {
	stmt, err := db.Prepare(`INSERT INTO comments (postID, userID, textContent, imageContent, createdAt) 
	VALUES (?, 1, ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))`)

	if err != nil {
		fmt.Printf("error with storecomment insert statement:%v", err)
	}

	res, err2 := stmt.Exec(postID, textContent, imgPath)

	if err2 != nil {
		fmt.Printf("error adding comment into database: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("comments table rows affected: ", rowsAff)
	fmt.Println("last inserted id: ", LastIns)
}

// function to get all comments related to a post

func GetAllComments(db *sql.DB, postID int) []Comment {
	rows, err := db.Query(`SELECT commentID, comments.createdAt, textContent, imageContent, users.firstName
	FROM comments
	INNER JOIN users ON users.userID=comments.userID
	WHERE comments.postID = ?`, postID)

	if err != nil {
		fmt.Printf("error with getAllComments query: %v", err)
	}

	var comments []Comment

	defer rows.Close()

	for rows.Next() {
		var c Comment

		err2 := rows.Scan(&c.CommentId, &c.CreatedAt, &c.TextContent, &c.ImageContent, &c.FName)
		if err2 != nil {
			fmt.Printf("error scanning the rows in getAllComments: %v", err2)
		}
		comments = append(comments, c)
	}
	return comments
}