package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type GroupData struct {
	NotificationType string `json:"notificationType"`
	Notifiyee        int    `json:"notifiyee"`
	Notifier         int    `json:"notifier"`
}

func (s *Server) HandleJoinGroup() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println(string(data))

		var g GroupData

		json.Unmarshal(data, &g)

		fmt.Printf("type %T", g.NotificationType)
		fmt.Printf("notifier %T", g.Notifier)

		fmt.Printf("notifiyee %T", g.Notifiyee)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
	}
}
