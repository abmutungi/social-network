package groups

import (
	"database/sql"
	"fmt"
)



func CreateGroup(db *sql.DB, groupname string,  creatorid int, desc string) {
	stmt, err := db.Prepare("INSERT INTO groups (userID,textContent, privacy, imagePath, createdAt) VALUES (1, ?, ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))")

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