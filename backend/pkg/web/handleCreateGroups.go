package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/groups"
)

type NewGroup struct {
	GroupName        string `json:"groupName"`
	GroupDescription string `json:"groupDescription"`
	CreatorID        int    `json:"creatorID"`
}

func (s *Server) HandleCreateGroup() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		var fileName string


		err := r.ParseMultipartForm(10 << 20)
		if err != nil {
			fmt.Println("err parsing group image", err)
		}

		fmt.Println("Form Groups", r.Form)

		if r.Form.Get("group-avatar") != "" {
			fileName = s.HandleImage(r)
		}

		fmt.Println("FILE NAME", fileName)

		creatorid, err := strconv.Atoi(r.Form.Get("creatorID"))
		if err != nil {
			fmt.Println("Error converting string to int, HandleCreateGroup fn()")
		}

		// //adds a new group to the db, returns all groups after
		var UpdatedGroups = groups.CreateGroup(s.Db, r.Form.Get("groupName"), creatorid, fileName, r.Form.Get("groupDescription"))

		AllGroups, err := json.Marshal(UpdatedGroups)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write([]byte(AllGroups))

	}
}
