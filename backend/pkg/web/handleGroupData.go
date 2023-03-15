package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/notifications"
)

type IsMember struct {
	GroupID int `json:"groupID"`
	UserID  int `json:"loggedInUserID"`
}

type GroupInfo struct {
	IsMember bool `json:"ismember"`
	Requested bool `json:"requested"`
}


func (s *Server) HandleGroups() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		AllGroupData := groups.GetAllGroupsData(s.Db)

		AllGroups, err := json.Marshal(AllGroupData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write([]byte(AllGroups))
	}
}

// runs number of times singleprof component exists, should be once!
func (s *Server) IsGroupMember() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("Error reading body from IsGroupMember", err)
		}

		var f IsMember

		json.Unmarshal(data, &f)

		isMember := groups.GroupMemberCheck(s.Db, f.GroupID, f.UserID)
		hasRequested := notifications.UserRequestedToJoin(s.Db, f.GroupID, f.UserID)

		fmt.Println("IsMember?", isMember)
		fmt.Println("hasRequested?", hasRequested)

		var g GroupInfo

		g.IsMember = isMember
		g.Requested = hasRequested

		GroupInfo, err := json.Marshal(g)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write([]byte(GroupInfo))
	}
}

// func (s *Server) HasRequested() http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		enableCors(&w)

// 	}
// }
