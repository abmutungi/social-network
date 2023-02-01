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
	Avatar    interface{}
	AboutText string
	Members   int
}


//add a new group entry to the group table
func CreateGroup(db *sql.DB, groupname string, creatorid int, file string, desc string)[]Group {
	stmt, err := db.Prepare("INSERT INTO groups (name, creator, avatar, about) VALUES ( ?, ?,?, ?)")

	if err != nil {
		fmt.Printf("error preparing create group statement: %v", err)
	}

	res, err2 := stmt.Exec(groupname, creatorid,file, desc)

	if err2 != nil {
		fmt.Printf("error adding group into database: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("groups rows affected: ", rowsAff)
	fmt.Println("group last inserted id: ", LastIns)

	AddGroupMember(db, int(LastIns), creatorid)

	return GetAllGroupsData(db)
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




func AddGroupMember(db *sql.DB, groupid int, memberid int) {
	stmt, err := db.Prepare("INSERT INTO groupMembers (groupid, member, dateJoined) VALUES ( ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))")

	if err != nil {
		fmt.Printf("error preparing within AddGroupMember fn: %v", err)
	}

	res, err2 := stmt.Exec(groupid, memberid)

	if err2 != nil {
		fmt.Printf("error adding new member to groupMember table: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("addgroupmember rows affected: ", rowsAff)
	fmt.Println("addgroupmember last inserted id: ", LastIns)

}


// checking if user follows loggedInUser
func GroupMemberCheck(db *sql.DB, loggedInUser, GroupID int) bool {
	var count int
	err := db.QueryRow(`SELECT  COUNT(*)  FROM groupMembers WHERE groupID = ? AND member = ?;`, GroupID,loggedInUser).Scan(&count)
	if err != nil {
		log.Println("Error from GroupMemberCheck fn():", err)
		return false
	}
	if count > 0 {
		return true
	}
	return false
}
