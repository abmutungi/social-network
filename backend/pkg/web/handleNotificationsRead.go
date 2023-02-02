package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/notifications"
)

type NotifRead struct {
	UserID int  `json:"loggedInUserID"`
	Read   bool `json:"read"`
}

type NotifResponse struct {
	NewNotif bool `json:"newNotif"`
	Notif    []notifications.Notification
}

func sendNewNotif(w http.ResponseWriter, notifResp NotifResponse) {
	resp, err := json.Marshal(notifResp)
	if err != nil {
		fmt.Println("Error marshalling error message struct --> ", err)
	}

	(w).Write([]byte(resp))
}

func (s *Server) HandleNotifRead() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println("Data from NotifRead H-Fn()************", string(data))

		var n NotifRead

		json.Unmarshal(data, &n)

		fmt.Println(n.UserID, n.Read)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		notifications.ReadNotification(s.Db, n.UserID)

		var notifResponse NotifResponse

		if notifications.NotificationCheck(s.Db, n.UserID) {
			notifResponse.PopulateNotifResponse(s.Db, n.UserID)
			sendNewNotif(w, notifResponse)

			fmt.Println("new notifications")
		} else {
			notifResponse.NewNotif = false
			notifResponse.Notif = nil
			sendNewNotif(w, notifResponse)
			fmt.Println("0 notifications")
		}
	}
}

func (nr *NotifResponse) PopulateNotifResponse(db *sql.DB, notifiyee int) {
	n := notifications.GetNotifications(db, notifiyee)

	// return notifications
	nr.NewNotif = true
	nr.Notif = n
}
