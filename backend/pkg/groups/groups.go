package groups

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"
)

type Group struct {
	GroupID   int
	GroupName string
	CreatorID int
	Avatar    interface{}
	AboutText string
	Members   int
}

func CreateGroup(db *sql.DB, groupname string, creatorid int, file string, desc string) []Group {
	stmt, err := db.Prepare("INSERT INTO groups (name, creator, avatar, about) VALUES ( ?, ?,?, ?)")
	if err != nil {
		fmt.Printf("error preparing create group statement: %v", err)
	}

	res, err2 := stmt.Exec(groupname, creatorid, file, desc)

	if err2 != nil {
		fmt.Printf("error adding group into database: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("groups rows affected: ", rowsAff)
	fmt.Println("group last inserted id: ", LastIns)

	return GetAllGroupsData(db)
}

// add and increment members to group table
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

// checking if loggedInUser is already in group
func GroupMemberCheck(db *sql.DB, groupID, loggedInUser int) bool {
	var count int
	err := db.QueryRow(`SELECT  COUNT(*)  FROM groupMembers WHERE groupID = ? AND member = ?;`, groupID, loggedInUser).Scan(&count)
	if err != nil {
		log.Println("Error from GroupMemberCheck fn():", err)
		return false
	}
	if count > 0 {
		fmt.Println("*****already part of group****")
		return true
	}
	fmt.Println("can join group")
	return false
}

func GetCreator(db *sql.DB, groupID int) int {
	userStmt := "SELECT creator FROM  groups WHERE groupID = ?"
	userRow := db.QueryRow(userStmt, groupID)
	var creator string
	err := userRow.Scan(&creator)
	if err != nil {
		fmt.Printf("Error in getting the creator for this groupID(%d): %v", groupID, err)
	}

	// fmt.Printf("creator------------>%v",creator)
	creatorID, err2 := strconv.Atoi(creator)
	if err2 != nil {
		fmt.Printf("err2:%v conv creator str to int", err2)
	}
	fmt.Printf("creatorID------------------------->%v", creatorID)
	return creatorID
}
func GetGroupName(db *sql.DB, groupID int) string {
	userStmt := "SELECT name FROM  groups WHERE groupID = ?"
	userRow := db.QueryRow(userStmt, groupID)
	var groupName string
	err := userRow.Scan(&groupName)
	if err != nil {
		fmt.Printf("Error in getting the groupName for this groupID(%d): %v", groupID, err)
	}
	return groupName
}

func AddUserToGroup(db *sql.DB, groupID, loggedInUser int) {
	stmt, err := db.Prepare("INSERT INTO groupMembers (groupID, member, dateJoined) VALUES ( ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))")
	if err != nil {
		fmt.Printf("error preparing create group statement: %v", err)
	}

	res, err2 := stmt.Exec(groupID, loggedInUser)


	if err2 != nil {
		fmt.Printf("error adding group members into database: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("groups rows affected: ", rowsAff)
	fmt.Println("group last inserted id: ", LastIns)
}
