package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/relationships"
)

type FollowerPublicData struct {
	User     int `json:"userID"`
	Follower int `json:"loggedInUserID"`
}

func (s *Server) HandlePublicFollow() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("FOLLOW CHECK HANDLER RUNNING")
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println(string(data))

		var f FollowerPublicData

		json.Unmarshal(data, &f)

		fmt.Println("logged in user from followBtn:", f.Follower)
		fmt.Println("user to follow from followBtn", f.User)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		if !relationships.FollowingYouCheck(s.Db, f.User, f.Follower) {
			relationships.StoreFollowing(s.Db, f.User, f.Follower)
		} else {
			fmt.Println("Relationship not added to the db as already follow this user")
		}
	}
}
