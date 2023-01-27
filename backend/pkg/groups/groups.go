package groups

import (
	"database/sql"
	"fmt"
)



func CreateGroup(db *sql.DB, groupname string,  creatorid int, desc string) {
	stmt, err := db.Prepare("INSERT INTO groups (name, creator, about) VALUES ( ?, ?, ?)")

	if err != nil {
		fmt.Printf("error preparing create group statement: %v", err)
	}

	res, err2 := stmt.Exec(groupname, creatorid, desc)

	if err2 != nil {
		fmt.Printf("error adding group into database: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("groups rows affected: ", rowsAff)
	fmt.Println("group last inserted id: ", LastIns)
}