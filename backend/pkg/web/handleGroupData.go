package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/groups"
)

type IsMember struct {
	GroupID int `json:"groupID"`
	UserID int `json:"loggedInUserID"`
}

func (s *Server) HandleGroups() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		enableCors(&w)

		var AllGroupData = groups.GetAllGroupsData(s.Db)

		AllGroups, err := json.Marshal(AllGroupData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write([]byte(AllGroups))

	}

}


//runs number of times singleprof component exists, should be once!
func (s *Server) IsGroupMember() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("Error reading body from IsGroupMember", err)
		}

		var f IsMember

		json.Unmarshal(data, &f)

	var isMember = groups.GroupMemberCheck(s.Db,  f.GroupID,f.UserID,)

	fmt.Println("IsMember?", isMember)


	Memberbool, err := json.Marshal(isMember)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	w.Write([]byte(Memberbool))


	}

}
