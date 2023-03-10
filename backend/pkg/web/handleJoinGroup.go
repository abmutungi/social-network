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
)

type GroupData struct {
	Group int `json:"groupID"`
	User  int `json:"loggedInUserID"`
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

		fmt.Printf("notifier %T", g.User)

		fmt.Printf("group %T", g.Group)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		if !groups.GroupMemberCheck(s.Db, g.Group, g.User) {
			notifications.StoreNotification(s.Db, "groupRequest", groups.GetCreator(s.Db, g.Group), g.User)
		} else {
			fmt.Println("Membership not added to the db as already part of group")
		}
	}
}
