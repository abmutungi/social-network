package groups

import (
	"database/sql"
	"fmt"
	"log"

	"strconv"

	comment "github.com/abmutungi/social-network/backend/pkg/comments"
)

type Group struct {
	GroupID   int
	GroupName string
	CreatorID int
	Avatar    interface{}
	AboutText string
	Members   int
}

type GroupPost struct {
	GroupPostID    int               `json:"grouppostID"`
	UserID         int               `json:"userID"`
	TextContent    string            `json:"textContent"`
	ImagePath      string            `json:"postImg"`
	CreatedAt      string            `json:"createdAt"`
	FName          string            `json:"name"`
	UserProfilePic string            `json:"profilePic"`
	Comments       []comment.Comment `json:"comments"`
	Events         []EventInfo       `json:"groupevents"`
}

type EventInfo struct {
	EventID     string `json:"eventid"`
	EventName   string `json:"eventname"`
	CanGo       int    `json:"cango"`
	NotGoing    int    `json:"notgoing"`
	Date        string `json:"date"`
	CreatorName string `json:"creator"`
	Description string `json:"description"`
	CreatorID   int    `json:"eventcreatorid"`
}

// add a new group entry to the group table, then adds the group creator to groupMember table
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

	AddGroupMember(db, int(LastIns), creatorid)

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

		a.Members = len(GetAllGroupMembers(db, a.GroupID))
		AllGroups = append(AllGroups, a)
	}

	return AllGroups
}

// adds a new entry to the groupMember table
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

// checking if loggedInUser is already in group
func GroupMemberCheck(db *sql.DB, groupID, loggedInUser int) bool {

	fmt.Println("GROUPDB FN", groupID, loggedInUser)
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

// add a new entry to the events table
// **TODO - amend date fields within table only one needed**
func CreateGroupEvent(db *sql.DB, groupID int, creatorid int, eventname string, desc string, date string) {
	stmt, err := db.Prepare("INSERT INTO events (groupID, creator, eventTitle, description, dateStart) VALUES (?,?,?,?,?)")

	if err != nil {
		fmt.Printf("error preparing creategroupevent statement: %v", err)
	}

	res, err2 := stmt.Exec(groupID, creatorid, eventname, desc, date)

	if err2 != nil {
		fmt.Printf("error adding new group event into database: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("groups rows affected: ", rowsAff)
	fmt.Println("group last inserted id: ", LastIns)

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
	//	fmt.Printf("creatorID------------------------->%v", creatorID)
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
		fmt.Printf("error preparing add user to group statement: %v", err)
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

// returns an array of all groupmemberIDs against a given groupID
func GetAllGroupMembers(db *sql.DB, groupid int) []int {
	rows, err := db.Query(`SELECT member FROM groupMembers WHERE groupID = ? ;`, groupid)
	if err != nil {
		log.Println("Error from GetAllGroupsmembers fn():", err)
		return nil
	}
	defer rows.Close()

	var AllMembers []int
	for rows.Next() {
		var a int
		err := rows.Scan(&a)
		if err != nil {
			log.Println("Error scanning group rows:", err)
			continue
		}
		AllMembers = append(AllMembers, a)
	}

	return AllMembers
}

// creates an entry within the notifcations table upon creation of an event
func UpdateNotifcationTablePostEventCreation(db *sql.DB, notifcationType string, notifyee, notifier, groupID int) {
	stmt, err := db.Prepare("INSERT INTO notifications (notificationType, notifiyee, notifier, createdAt, groupID) VALUES ( ?, ?, ?,strftime('%H:%M %d/%m/%Y','now','localtime'), ?)")

	if err != nil {
		fmt.Printf("error preparing UpdateNotificationTablePostEventCreation fn: %v", err)
	}

	res, err2 := stmt.Exec(notifcationType, notifyee, notifier, groupID)

	if err2 != nil {
		fmt.Printf("error adding entry to notification table: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("addgroupmember rows affected: ", rowsAff)
	fmt.Println("addgroupmember last inserted id: ", LastIns)

}

func GetNameFromID(db *sql.DB, UserID int) string {
	stmt := db.QueryRow(`SELECT firstName FROM users
	WHERE userID = ?`, UserID)

	var name string

	stmt.Scan(&name)

	return name

}

// get all groupposts.
func GetAllGroupPosts(db *sql.DB, GroupID int) []GroupPost {
	rows, err := db.Query(`SELECT groupPostID, userID, createdAt, textContent, imageContent
	FROM groupPosts
	WHERE groupID = ?`, GroupID)

	if err != nil {
		fmt.Printf("error querying getAllUserPosts statement: %v", err)
	}

	posts := []GroupPost{}

	// defer db.Close()
	defer rows.Close()
	for rows.Next() {
		var p GroupPost
		err2 := rows.Scan(&p.GroupPostID, &p.UserID, &p.CreatedAt, &p.TextContent, &p.ImagePath)
		if err2 != nil {
			fmt.Printf("error scanning rows for groupposts: %v", err2)
		}
		p.FName = GetNameFromID(db, p.UserID)
		p.Comments = comment.GetAllComments(db, p.GroupPostID)
		//p.Events = GetEventInfo(db, GroupID)
		posts = append(posts, p)
	}

	return posts
}

func GetEventInfo(db *sql.DB, GroupID int) []EventInfo {
	rows, err := db.Query(`SELECT eventID, eventTitle, description, attending, dateStart, creator
	FROM events
	WHERE groupID =
	?`, GroupID)

	if err != nil {
		fmt.Printf("error getting Events data: %v", err)
	}

	event := []EventInfo{}

	// defer db.Close()
	defer rows.Close()
	for rows.Next() {
		var p EventInfo
		err2 := rows.Scan(&p.EventID, &p.EventName, &p.Description, &p.CanGo, &p.Date, &p.CreatorID)
		if err2 != nil {
			fmt.Printf("error scanning rows for groupposts: %v", err2)
		}
		p.CreatorName = GetNameFromID(db, p.CreatorID)

		p.NotGoing = len(GetAllGroupMembers(db, GroupID)) - p.CanGo

		event = append(event, p)
	}

	return event
}

//return userids with pending groupinvites where action = 0
func PendingGroupInvite(db *sql.DB, groupId int) []int {

	rows, err := db.Query(`SELECT notifiyee
	FROM notifications
	WHERE groupID =
	? AND actioned = ?`, groupId, 0)

	if err != nil {
		fmt.Printf("error from PendingGroupInvite(): %v", err)
	}

	var result []int

	defer rows.Close()

	for rows.Next() {
		var p int
		err2 := rows.Scan(&p)
		if err2 != nil {
			fmt.Printf("error scanning rows for PendingGroupInvite: %v", err2)
		}

		result = append(result, p)
	}

	return result

}
