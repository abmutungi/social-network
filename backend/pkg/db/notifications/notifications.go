package notifications

import (
	"database/sql"
	"fmt"
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
