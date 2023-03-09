package groups

import (
	"database/sql"
	"fmt"
	"log"
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
	GroupPostID         int               `json:"grouppostID"`
	UserID         int               `json:"userID"`
	TextContent    string            `json:"textContent"`
	ImagePath      string            `json:"postImg"`
	CreatedAt      string            `json:"createdAt"`
	Privacy        string            `json:"privacy"`
	FName          string            `json:"name"`
	UserProfilePic string            `json:"profilePic"`
	Comments       []comment.Comment `json:"comments"`
}

//add a new group entry to the group table, then adds the group creator to groupMember table
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
		
		a.Members = len(GetAllGroupMembers(db, a.GroupID))
		AllGroups = append(AllGroups, a)
	}

	return AllGroups
}

//adds a new entry to the groupMember table
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

// checking if user is a group valid
func GroupMemberCheck(db *sql.DB, loggedInUser, GroupID int) bool {
	var count int
	err := db.QueryRow(`SELECT  COUNT(*)  FROM groupMembers WHERE groupID = ? AND member = ?;`, GroupID, loggedInUser).Scan(&count)
	if err != nil {
		log.Println("Error from GroupMemberCheck fn():", err)
		return false
	}
	if count > 0 {
		return true
	}
	return false
}

//add a new entry to the events table
//**TODO - amend date fields within table only one needed**
func CreateGroupEvent(db *sql.DB, groupID int, creatorid int, eventname string, desc string, date string, dateEnd string) {
	stmt, err := db.Prepare("INSERT INTO events (groupID, creator, eventTitle, description, dateStart, dateFinish) VALUES (?,?,?,?,?,?)")

	if err != nil {
		fmt.Printf("error preparing creategroupevent statement: %v", err)
	}

	res, err2 := stmt.Exec(groupID, creatorid, eventname, desc, date,dateEnd)

	if err2 != nil {
		fmt.Printf("error adding new group event into database: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("groups rows affected: ", rowsAff)
	fmt.Println("group last inserted id: ", LastIns)

}


//returns an array of all groupmemberIDs against a given groupID
func GetAllGroupMembers(db *sql.DB,groupid int) []int {
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


//creates an entry within the notifcations table upon creation of an event 
func UpdateNotifcationTablePostEventCreation(db *sql.DB, notifcationType string, notifyee, notifier, groupID int) {
	stmt, err := db.Prepare("INSERT INTO notifications (notificationType, notifiyee, notifier, createdAt, groupID) VALUES ( ?, ?, ?,strftime('%H:%M %d/%m/%Y','now','localtime'), ?)")

	if err != nil {
		fmt.Printf("error preparing UpdateNotificationTablePostEventCreation fn: %v", err)
	}

	res, err2 := stmt.Exec( notifcationType, notifyee,notifier, groupID )

	if err2 != nil {
		fmt.Printf("error adding entry to notification table: %v", err2)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("addgroupmember rows affected: ", rowsAff)
	fmt.Println("addgroupmember last inserted id: ", LastIns)

}


// get all groupposts that belong to a userID.
func GetAllGroupPosts(db *sql.DB, GroupID int, userID int) []GroupPost {
	rows, err := db.Query(`SELECT groupPostID, groupPosts.userID, groupPosts.createdAt, textContent, imageContent, users.firstName
	FROM groupPosts
	INNER JOIN users ON users.userID = groupPosts.userID 
	WHERE groupPosts.userID = ?`, userID)

	if err != nil {
		fmt.Printf("error querying getAllUserPosts statement: %v", err)
	}


	posts := []GroupPost{}

	// defer db.Close()
	defer rows.Close()
	for rows.Next() {
		var p GroupPost
		err2 := rows.Scan(&p.GroupPostID, &p.UserID, &p.CreatedAt, &p.TextContent, &p.ImagePath, &p.FName)
		if err2 != nil {
			fmt.Printf("error scanning rows for groupposts: %v", err2)
		}
		p.Comments = comment.GetAllComments(db, p.GroupPostID)
		posts = append(posts, p)
	}

	return posts
}