package notifications

import (
	"database/sql"
	"fmt"
	"log"

	// "github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/groups"
)

type Notification struct {
	NotificationID        int    `json:"notifID"`
	NotificationType      string `json:"notifType"`
	NotifiyeeID           int    `json:"notifiyeeID"`
	NotifierID            int    `json:"notifierID"`
	NotifierFName         string `json:"notifFName"`
	NotifierLName         string `json:"notifLName"`
	NotificationDate      string `json:"notifDate"`
	NotificationGroupID   int    `json:"notifGroupID"`
	NotificationGroupName string `json:"notifGroupName"`
	NotificationAccept    int    `json:"notifAccept"`
	Tipo                  string `json:"tipo"`
}

func StoreNotification(db *sql.DB, notificationType string, notifiyee, notifier, groupID int) {
	stmt, err := db.Prepare("INSERT INTO notifications (notificationType, notifiyee, notifier, groupID, createdAt) VALUES (?, ?, ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))")
	if err != nil {
		fmt.Println("error adding notification into db", err)
		return
	}

	result, _ := stmt.Exec(notificationType, notifiyee, notifier, groupID)
	rowsAff, _ := result.RowsAffected()
	LastIns, _ := result.LastInsertId()
	fmt.Println("rows affected:", rowsAff)
	fmt.Println("last inserted:", LastIns)
}

func ActionNotification(db *sql.DB, notifID, userID, followerID int) {
	result, err := db.Exec("UPDATE notifications SET actioned = 1 WHERE notificationID=?", notifID)
	if err != nil {
		log.Fatal(err)
	}
	rows, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	if rows != 1 {
		log.Fatalf("expected to affect 1 row, affected %d", rows)
	}
}

func NotificationCheck(db *sql.DB, loggedInUser int) bool {
	var count int
	err := db.QueryRow(`SELECT COUNT (*) FROM notifications where notifiyee = ? AND read=0 AND actioned = 0`, loggedInUser).Scan(&count)
	if err != nil {
		log.Println("Error from NotificationCheck fn():", err)
		return false
	}

	if count > 0 {
		fmt.Printf("user has %d notifications", count)
		return true
	}
	fmt.Println("user has 0 notifications")
	return false
}

func ReadNotification(db *sql.DB, userID int) {
	result, err := db.Exec("UPDATE notifications SET read = 1 WHERE notifiyee =?", userID)
	if err != nil {
		log.Fatal(err)
	}
	rows, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(rows)
}

func GetNotifications(db *sql.DB, userID int) []Notification {
	rows, err := db.Query(`SELECT notificationID, notificationType, notifiyee, notifier, firstName, lastName, notifications.createdAt, 
	notifications.groupID FROM notifications INNER JOIN users ON notifier=userID WHERE notifiyee = ? AND actioned=0`, userID)
	if err != nil {
		log.Println("Error from GetNotifications fn():", err)
		return nil
	}
	defer rows.Close()

	var MyNotifs []Notification
	for rows.Next() {
		var n Notification
		err := rows.Scan(&n.NotificationID, &n.NotificationType, &n.NotifiyeeID, &n.NotifierID, &n.NotifierFName, &n.NotifierLName, &n.NotificationDate, &n.NotificationGroupID)

		// groupID, err := strconv.Atoi(g.Group)
		// if err != nil {
		// 	fmt.Printf("err: %v conv str in handlejoingroup fn()", err)
		// }
		fmt.Printf("n.NotificationGroupID----------->%v\ntype: %T\n", n.NotificationGroupID, n.NotificationGroupID)

		n.NotificationGroupName = groups.GetGroupName(db, n.NotificationGroupID)
		if err != nil {
			log.Println("Error scanning rows:", err)
			continue
		}
		MyNotifs = append(MyNotifs, n)
	}

	return MyNotifs
}

func GroupNotificationCheck(db *sql.DB, notificationID int) bool {
	var count int
	err := db.QueryRow(`SELECT COUNT (*) FROM notifications where notificationID = ? AND notificationType="groupRequest"`, notificationID).Scan(&count)
	if err != nil {
		log.Println("Error from GroupNotificationCheck fn():", err)
		return false
	}

	if count > 0 {
		fmt.Printf("user has %d group notifications", count)
		return true
	}
	fmt.Println("user has 0 group notifications")
	return false
}

func GetGroupID(db *sql.DB, notificationID int) int {
	userStmt := "SELECT groupID FROM notifications WHERE notificationID = ?"
	userRow := db.QueryRow(userStmt, notificationID)
	var groupID int
	err := userRow.Scan(&groupID)
	if err != nil {
		fmt.Printf("Error in getting the groupID for this notificationID(%d): %v", notificationID, err)
	}
	return groupID
}

func UserRequestedToJoin(db *sql.DB, groupID, userID int) bool {
	var count int
	err := db.QueryRow(`SELECT COUNT (*) FROM notifications where groupID = ? AND notifier = ?`, groupID, userID).Scan(&count)
	if err != nil {
		log.Println("Error from UserRequestedToJoin fn():", err)
		return false
	}

	if count > 0 {
		fmt.Printf("user: %v has requested to join group: %v", userID, groupID)
		return true
	}
	fmt.Printf("user: %v has NOT requested to join group: %v", userID, groupID)
	return false
}
