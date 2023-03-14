package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/notifications"
	"github.com/abmutungi/social-network/backend/pkg/relationships"
)

type NotifRead struct {
	UserID int  `json:"loggedInUserID"`
	Read   bool `json:"read"`
}

type NotifResponse struct {
	AllNotifs []notifications.Notification
}

type NewNotif struct {
	NewNotif bool `json:"newNotif"`
}

type Notifiyee struct {
	UserID int `json:"loggedInUserID"`
}

func sendNewNotif(w http.ResponseWriter, notifResp NotifResponse) {
	resp, err := json.Marshal(notifResp)
	if err != nil {
		fmt.Println("Error marshalling error message struct --> ", err)
	}

	(w).Write([]byte(resp))
}

func (s *Server) HandleNotifCheck() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println("Data from NotifRead H-Fn()************", string(data))

		var n NotifRead

		json.Unmarshal(data, &n)

		fmt.Println(n.UserID)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		notifications.ReadNotification(s.Db, n.UserID)

		var notifResponse NewNotif

		if notifications.NotificationCheck(s.Db, n.UserID) {
			notifResponse.NewNotif = true
			sendNotifStatus, err := json.Marshal(notifResponse)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			fmt.Println("new notifications")

			w.Header().Set("Content-Type", "application/json")
			w.Write(sendNotifStatus)
			return

		} else {
			notifResponse.NewNotif = false
			sendNotifStatus, err := json.Marshal(notifResponse)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			w.Write(sendNotifStatus)
			fmt.Println("0 notifications")
			return
		}
	}
}

func (nr *NotifResponse) PopulateNotifResponse(db *sql.DB, notifiyee int) {
	// return if I have notifications
	n := notifications.GetNotifications(db, notifiyee)

	nr.AllNotifs = n
}

func (s *Server) HandleNotifDisplay() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println("Data received for notifdisplay H-Fn()-------", string(data))

		var n Notifiyee

		json.Unmarshal(data, &n)

		fmt.Println(n.UserID)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		var notifResponse NotifResponse

		notifResponse.PopulateNotifResponse(s.Db, n.UserID)

		fmt.Printf("notifResponse------------>%v", notifResponse)

		sendNewNotif(w, notifResponse)
		fmt.Println("notifications onclick")
	}
}

func (s *Server) HandleActionNotif() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}
		fmt.Println("Data received from `actionNotif H-Fn()-------", string(data))

		var n notifications.Notification

		json.Unmarshal(data, &n)

		fmt.Println(n.NotifiyeeID)
		fmt.Println(n.NotifierID)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		// check notification is a group request
		if notifications.GroupNotificationCheck(s.Db, n.NotificationID) {
			groups.AddUserToGroup(s.Db, notifications.GetGroupID(s.Db, n.NotificationID), n.NotifierID)
			notifications.ActionNotification(s.Db, n.NotificationID, n.NotifiyeeID, n.NotifierID)
		} else {

			// check if notification is group invitation

			// check if notification is event invitation

			// else
			notifications.ActionNotification(s.Db, n.NotificationID, n.NotifiyeeID, n.NotifierID)
			relationships.StoreFollowing(s.Db, n.NotifiyeeID, n.NotifierID)
			relationships.DeleteRequest(s.Db, n.NotificationID)
		}
	}
}
