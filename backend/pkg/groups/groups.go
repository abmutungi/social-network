package groups

import (
	"database/sql"
	"fmt"
	"log"
)

type Group struct {
	GroupID   int
	GroupName string
	CreatorID int
	Avatar    string
	AboutText string
	Members   int
}

func CreateGroup(db *sql.DB, groupname string, creatorid int, desc string) {
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

//add and increment members to group table
func GetAllGroupsData(db *sql.DB) []Group {
	rows, err := db.Query(`SELECT * FROM groups ;`)
	if err != nil {
		log.Println("Error from GetAllGroupsData fn():", err)
		return nil
	}
	defer rows.Close()

	var AllGroups []Group
	for rows.Next() {
		var a Group
		err := rows.Scan(&a.GroupID, &a.GroupName, &a.CreatorID, &a.Avatar, &a.AboutText)
		if err != nil {
			log.Println("Error scanning group rows:", err)
			continue
		}
		AllGroups = append(AllGroups, a)
	}

	return AllGroups
}
