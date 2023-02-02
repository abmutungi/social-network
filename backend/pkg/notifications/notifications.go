package notifications

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/abmutungi/social-network/backend/pkg/relationships"
)

type Notification struct {
	NotificationID   int    `json:"notifID"`
	NotificationType string `json:"notifType"`
	NotifierFName    string `json:"notifFName"`
	NotifierLName    string `json:"notifLName"`
}

func StoreNotification(db *sql.DB, notificationType string, notifiyee, notifier int) {
	stmt, err := db.Prepare("INSERT INTO notifications (notificationType, notifiyee, notifier) VALUES (?, ?, ?)")
	if err != nil {
		fmt.Println("error adding notification into db", err)
		return
	}

	result, _ := stmt.Exec(notificationType, notifiyee, notifier)
	rowsAff, _ := result.RowsAffected()
	LastIns, _ := result.LastInsertId()
	fmt.Println("rows affected:", rowsAff)
	fmt.Println("last inserted:", LastIns)
}

func AcceptFollow(db *sql.DB, userID, followerID int, notificationType string) {
	result, err := db.Exec("UPDATE notifcations SET actioned = actioned + 1 WHERE userID =? AND followerID = ?", userID, followerID)
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
	result, err := db.Exec("UPDATE notifications SET read = read + 1 WHERE notifiyee =?", userID)
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
	//`SELECT notifications.notificationID, notifications.notifier notifications.notificationType, users.firstName, users.lastName FROM notifications INNER JOIN users ON notifications.notifier=users.userID WHERE notifications.notifiyee = 1`
	rows, err := db.Query(`SELECT notificationID, notifier notificationType, firstName, lastName 
	FROM notifications INNER JOIN users ON notifier=userID WHERE notifiyee = ?`, userID)
	if err != nil {
		log.Println("Error from GetNotifications fn():", err)
		return nil
	}
	defer rows.Close()

	var MyNotifs []Notification
	for rows.Next() {
		var n Notification
		err := rows.Scan(&n.NotificationID, &n.NotificationType, &n.NotifierFName, &n.NotifierLName)
		if err != nil {
			log.Println("Error scanning rows:", err)
			continue
		}
		MyNotifs = append(MyNotifs, n)
	}

	return MyNotifs
}
