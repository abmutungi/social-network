package posts

import (
	"database/sql"
	"fmt"

	comment "github.com/abmutungi/social-network/backend/pkg/comments"
)

// can change the name of imageContent in db to imgPath
type Post struct {
	PostID         int               `json:"postID"`
	UserID         int               `json:"userID"`
	TextContent    string            `json:"textContent"`
	ImagePath      string            `json:"postImg"`
	CreatedAt      string            `json:"createdAt"`
	Privacy        string            `json:"privacy"`
	FName          string            `json:"name"`
	UserProfilePic string            `json:"profilePic"`
	Comments       []comment.Comment `json:"comments"`
}

func CreatePost(db *sql.DB, userID int, textContent string, postPrivacy string, imgPath string) {
	stmt, err := db.Prepare("INSERT INTO wallPosts (userID,textContent, privacy, imagePath, createdAt) VALUES (?, ?, ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))")

	if err != nil {
		fmt.Printf("error preparing create post statement: %v", err)
	}

	res, err2 := stmt.Exec(userID, textContent, postPrivacy, imgPath)

	if err2 != nil {
		fmt.Printf("error adding post into database: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("rows affected: ", rowsAff)
	fmt.Println("last inserted id: ", LastIns)
}

// get all posts that belong to a userID.
// Need to add corresponding comments, when db comment function is done
func GetAllUserPosts(db *sql.DB, userID int) []Post {
	rows, err := db.Query(`SELECT wallPostID, wallPosts.userID, wallPosts.createdAt, textContent, imagePath, wallPosts.privacy, users.firstName
	FROM wallPosts
	INNER JOIN users ON users.userID = wallPosts.userID 
	WHERE wallPosts.userID = ?`, userID)

	if err != nil {
		fmt.Printf("error querying getAllUserPosts statement: %v", err)
	}

	posts := []Post{}

	// defer db.Close()
	defer rows.Close()
	for rows.Next() {
		var p Post
		err2 := rows.Scan(&p.PostID, &p.UserID, &p.CreatedAt, &p.TextContent, &p.ImagePath, &p.Privacy, &p.FName)
		if err2 != nil {
			fmt.Printf("error scaning rows for posts: %v", err2)
		}
		p.Comments = comment.GetAllComments(db, p.PostID)
		posts = append(posts, p)
	}

	return posts
}
