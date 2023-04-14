package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/relationships"
)

type UnfollowData struct {
	User     int `json:"userID"`
	Follower int `json:"loggedInUserID"`
}

func (s *Server) HandleUnfollow() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		//	fmt.Println(string(data))

		var f UnfollowData

		json.Unmarshal(data, &f)

		// fmt.Println(f.User)
		// fmt.Println(f.Follower)

		//s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		if relationships.FollowingYouCheck(s.Db, f.User, f.Follower) {
			relationships.UnfollowUser(s.Db, f.User, f.Follower)
		} else {
			fmt.Println("You don't follow this user")
		}
	}
}
