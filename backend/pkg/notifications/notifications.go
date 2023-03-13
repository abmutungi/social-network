package notifications

import (
	"database/sql"
	"fmt"
	"log"

	// "github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/relationships"
)

type Notification struct {
	NotificationID        int    `json:"notifID"`
	NotificationType      string `json:"notifType"`
	NotifiyeeID           int    `json:"notifiyeeID"`
	NotifierID            int    `json:"notifierID"`
	NotifierFName         string `json:"notifFName"`
	NotifierLName         string `json:"notifLName"`
	NotificationDate      int    `json:"notifDate"`
	NotificationGroupID   int    `json:"notifGroupID"`
	// NotificationGroupName string `json:"notifGroupName"`
}

func StoreNotification(db *sql.DB, notificationType string, notifiyee, notifier, groupID int) {
	stmt, err := db.Prepare("INSERT INTO notifications (notificationType, notifiyee, notifier, groupID) VALUES (?, ?, ?, ?)")
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

func AcceptFollow(db *sql.DB, notifID, userID, followerID int) {
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

	relationships.StoreFollowing(db, userID, followerID)
}

func NotificationCheck(db *sql.DB, loggedInUser int) bool {
	var count int
	err := db.QueryRow(`SELECT COUNT (*) FROM notifications where notifiyee = ? AND read=0`, loggedInUser).Scan(&count)
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
	notifications.groupID FROM notifications INNER JOIN users ON notifier=userID WHERE notifiyee = ?`, userID)
	if err != nil {
		log.Println("Error from GetNotifications fn():", err)
		return nil
	}
	defer rows.Close()

	var MyNotifs []Notification
	for rows.Next() {
		var n Notification
		err := rows.Scan(&n.NotificationID, &n.NotificationType, &n.NotifiyeeID, &n.NotifierID, &n.NotifierFName, &n.NotifierLName, &n.NotificationDate, &n.NotificationGroupID)
		// n.NotificationGroupName = groups.GetGroupName(db, n.NotificationGroupID)
		if err != nil {
			log.Println("Error scanning rows:", err)
			continue
		}
		MyNotifs = append(MyNotifs, n)
	}

	return MyNotifs
}
