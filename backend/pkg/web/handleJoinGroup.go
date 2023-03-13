package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/notifications"
)

type GroupData struct {
	Group string `json:"groupID"`
	User  int    `json:"loggedInUserID"`
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

		groupID, err := strconv.Atoi(g.Group)
		if err != nil {
			fmt.Printf("err: %v conv str in handlejoingroup fn()", err)
		}

		if !groups.GroupMemberCheck(s.Db, groupID, g.User) {
			notifications.StoreNotification(s.Db, "groupRequest", groups.GetCreator(s.Db, groupID), g.User, groupID)
		} else {
			fmt.Println("Membership not added to the db as already part of group")
		}
	}
}
