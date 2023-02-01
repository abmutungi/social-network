package notifications

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/abmutungi/social-network/backend/pkg/relationships"
)

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
	err := db.QueryRow(`SELECT COUNT (*) FROM notifications where notifiyee = ?`, loggedInUser).Scan(&count)
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
