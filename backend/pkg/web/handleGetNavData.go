package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/relationships"
)

func (s *Server) HandleGetNavData() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing within HandleGetNavData: %v", err)
		}

		NavType := r.Form.Get("Type")
		LIU, _ := strconv.Atoi(r.Form.Get("LIU"))

		fmt.Println("FROM NAV", NavType, LIU)

		switch NavType {
		case "followers":
			data := relationships.GetAllFollowers(s.Db, LIU)
			fmt.Println("NAV DATA FOLLOWING POST", data)

			marshalNavData, _ := json.Marshal(data)
			w.Header().Set("Content-Type", "application/json")
			w.Write(marshalNavData)

		case "following":
			data := relationships.GetFollowing(s.Db, LIU)
			fmt.Println("NAV DATA FOLLOWING", data)

			marshalNavData, _ := json.Marshal(data)
			w.Header().Set("Content-Type", "application/json")
			w.Write(marshalNavData)

		case "groups":
			data := groups.GetMyGroups(s.Db, LIU)
			fmt.Println("NAV DATA Groups", data)

			marshalNavData, _ := json.Marshal(data)
			w.Header().Set("Content-Type", "application/json")
			w.Write(marshalNavData)

		}

	}
}
