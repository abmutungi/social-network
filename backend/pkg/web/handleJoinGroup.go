package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	//	"strconv"
)

type GroupData struct {
	Group int `json:"groupID"`
	User  int `json:"loggedInUserID"`
	Tipo string `json:"tipo"`
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

		// s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		// if !groups.GroupMemberCheck(s.Db, g.Group, g.User) {
		// 	notifications.StoreNotification(s.Db, "groupRequest", groups.GetCreator(s.Db, g.Group), g.User, g.Group)
		// } else {
		// 	fmt.Println("Membership not added to the db as already part of group")
		// }
	}
}
