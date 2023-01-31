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

type FollowStatusCheck struct {
	User     int `json:"loggedInUserID"`
	UserOfInterest int `json:"userID"`
}

type FollowStatus struct {
	CanFollow bool `json:"canFollow"`
	Following bool `json:"following"`
	Requested bool `json:"requested"`
}

func (s *Server) HandleFollowCheck() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println("DATA FROM FollowCheck HFn() ******************", string(data))

		var f FollowStatusCheck

		json.Unmarshal(data, &f)

		

		fmt.Printf("****LOGGED IN USER: %v\n****USER TO FOLLOW:%v\n", f.User, f.UserOfInterest)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		if !relationships.FollowingYouCheck(s.Db,f.UserOfInterest, f.User) && !relationships.FollowRequestCheck(s.Db, f.User, f.UserOfInterest) {
			var s FollowStatus
			s.CanFollow = true
			s.Following = false
			s.Requested = false

			sendFollowStatus, err := json.Marshal(s)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.Write(sendFollowStatus)
			return

		} else if relationships.FollowRequestCheck(s.Db, f.User, f.UserOfInterest) {
			var s FollowStatus

			s.Requested = true
			s.CanFollow = false
			s.Following = false

			sendFollowStatus, err := json.Marshal(s)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.Write(sendFollowStatus)
			return
		} else if relationships.FollowingYouCheck(s.Db, f.UserOfInterest, f.User) {
			var s FollowStatus

			s.Following = true
			s.CanFollow = false
			s.Requested = false

			sendFollowStatus, err := json.Marshal(s)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.Write(sendFollowStatus)
			return
		}
	}
}
