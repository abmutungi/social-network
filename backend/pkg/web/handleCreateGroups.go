package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
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

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("erroring reading new group data", err)
		}


		var ng NewGroup

		json.Unmarshal(data, &ng)
		
		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		groups.CreateGroup(s.Db, ng.GroupName, ng.CreatorID, ng.GroupDescription)

		fmt.Println("Post Marsh Group", ng)
		// fmt.Println(f.Follower)


		// if !relationships.FollowingYouCheck(s.Db, f.User, f.Follower) {
		// 	relationships.StoreFollowing(s.Db, f.User, f.Follower)
		// } else {
		// 	fmt.Println("Relationship not added to the db as already follow this user")
		// }
	}
}
