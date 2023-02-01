package web

import (
	"encoding/json"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/groups"
)

type Group struct {
	GroupID   int
	GroupName string
	CreatorID int
	AboutText []string
	Members   int
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
