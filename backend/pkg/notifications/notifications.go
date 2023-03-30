package notifications

import (
	"database/sql"
	"fmt"
	"log"

	// "github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/users"
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
	NotificationEventID   int    `json:"notifEventID"`
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
	err := db.QueryRow(`SELECT COUNT (*) FROM notifications where notifiyee = ? 
	AND read=0 AND actioned = 0 
	AND NOT notificationType="privateMessage" 
	AND NOT notificationType="groupMessage"`, loggedInUser).Scan(&count)
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
	result, err := db.Exec(`UPDATE notifications SET read = 1 WHERE notifiyee =? 
	AND NOT notificationType="privateMessage"
	AND NOT notificationType="groupMessage"`, userID)
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
	notifications.groupID, notifications.eventID FROM notifications 
	INNER JOIN users ON notifier=userID WHERE notifiyee = ? 
	AND actioned=0 
	AND NOT notificationType="privateMessage"
	AND NOT notificationType="groupMessage"`, userID)
	if err != nil {
		log.Println("Error from GetNotifications fn():", err)
		return nil
	}
	defer rows.Close()

	var MyNotifs []Notification
	for rows.Next() {
		var n Notification
		err := rows.Scan(&n.NotificationID, &n.NotificationType, &n.NotifiyeeID, &n.NotifierID, &n.NotifierFName, &n.NotifierLName, &n.NotificationDate, &n.NotificationGroupID, &n.NotificationEventID)

		// groupID, err := strconv.Atoi(g.Group)
		// if err != nil {
		// 	fmt.Printf("err: %v conv str in handlejoingroup fn()", err)
		// }
		fmt.Printf("n.NotificationGroupID----------->%v\ntype: %T\n", n.NotificationGroupID, n.NotificationGroupID)

		n.NotificationGroupName = groups.GetGroupName(db, n.NotificationGroupID)

		// if n.NotificationType == "eventInvite" {
		// 	n.NotificationEventID =
		// }

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

// gets the notification type against a given notification id
func GetNotificationType(db *sql.DB, notificationID int) string {
	userStmt := "SELECT notificationType FROM notifications WHERE notificationID = ?"
	userRow := db.QueryRow(userStmt, notificationID)
	var notType string
	err := userRow.Scan(&notType)
	if err != nil {
		fmt.Println("Error in getting the notification type", err)
	}
	return notType
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

func ReturnUserChatNotifications(db *sql.DB, notifyeeID int) []string {
	rows, err := db.Query(`SELECT DISTINCT notifier FROM notifications WHERE notifiyee=? AND notificationType="privateMessage" AND read=0`, notifyeeID)
	if err != nil {
		fmt.Printf("Error when querying db for chat notifications: %v\n", err)
	}
	defer rows.Close()
	var notifiers []int

	for rows.Next() {
		var n int
		err2 := rows.Scan(&n)
		notifiers = append(notifiers, n)

		if err2 != nil {
			fmt.Printf("Error when scanning through rows for chat notifications: %v\n", err2)
		}
	}
	var result []string

	for _, ntfr := range notifiers {
		fmt.Println("Checking ntfrs id --> ", ntfr)
		result = append(result, users.ReturnSingleUser(db, users.GetEmailFromUserID(db, ntfr)).Firstname)
	}

	for _, r := range result {

		fmt.Println("Checking array of names ==> ", r)
	}

	return result
}

func CheckIfUserHasNotificationsFromUser(db *sql.DB, notifiyee, potentialNotifierID int) bool {
	var count int
	err := db.QueryRow(`SELECT COUNT (*) FROM notifications where notifiyee = ? AND read=0 AND notifier = ? AND notificationType="privateMessage"`, notifiyee, potentialNotifierID).Scan(&count)
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

func ReadChatNotification(db *sql.DB, notifiyeeID, notifierID int) {
	result, err := db.Exec(`UPDATE notifications SET read = 1 WHERE notifiyee =? AND notifier=? AND notificationType="privateMessage"`, notifiyeeID, notifierID)
	if err != nil {
		log.Fatal(err)
	}
	rows, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(rows)
}

// return all groupIDs that you have a chat from
func GetGroupChatNotifs(db *sql.DB, userID int) []int {
	rows, err := db.Query(`SELECT DISTINCT groupID from notifications 
	WHERE notifiyee = ? AND read = 0 AND notificationType = "groupMessage"`, userID)

	if err != nil {
		fmt.Printf("Error when querying db for group chat notifications: %v\n", err)
	}

	defer rows.Close()

	var groupIDs []int

	for rows.Next() {
		var groupID int

		err := rows.Scan(&groupID)

		if err != nil {
			fmt.Printf("Error when scanning through rows for group IDs: %v\n", err)
		}

		groupIDs = append(groupIDs, groupID)
	}

	return groupIDs

}

func ReadGroupChatNotif(db *sql.DB, userID int, groupID int) {
	_, err := db.Exec(`UPDATE notifications SET read = 1 
	WHERE notifiyee = ? 
	AND groupID = ? 
	AND notificationType="groupMessage"`, userID, groupID)
	if err != nil {
		fmt.Printf("Error update group chat message to read : %v", err)
	}

}
