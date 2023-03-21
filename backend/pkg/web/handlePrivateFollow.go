package web

import (
	//"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	// "github.com/abmutungi/social-network/backend/pkg/notifications"
	// "github.com/abmutungi/social-network/backend/pkg/relationships"
)

type FollowerPrivateData struct {
	NotificationType string `json:"notificationType"`
	FNotifiyee        int    `json:"notifiyee"`
	Notifier         int    `json:"notifier"`
	Tipo             string `json:"tipo"`
}

func (s *Server) HandlePrivateFollow() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println(string(data))

		var f FollowerPrivateData

		json.Unmarshal(data, &f)

		fmt.Println(f.FNotifiyee)
		fmt.Println(f.Notifier)

		fmt.Printf("type %T", f.NotificationType)
		fmt.Printf("notifier %T", f.Notifier)

		fmt.Printf("notifiyee %T", f.FNotifiyee)

		// s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		// if !relationships.FollowingYouCheck(s.Db, f.Notifiyee, f.Notifier) {
		// 	notifications.StoreNotification(s.Db, f.NotificationType, f.Notifiyee, f.Notifier, 0)
		// } else {
		// 	fmt.Println("Relationship not added to the db as already follow this user")
		// }
	}
}
