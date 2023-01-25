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
	User     int `json:"user"`
	ToFollow int `json:"toFollowID"`
}

type StatusCanFollow struct {
	CanFollow bool `json:"canFollow"`
}

type StatusFollowing struct {
	Following bool `json:"following"`
}

type StatusRequested struct {
	Requested bool `json:"requested"`
}

func (s *Server) HandleFollowCheck() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println("DATA******************",string(data))

		var f FollowStatusCheck

		json.Unmarshal(data, &f)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		if !relationships.FollowRequestCheck(s.Db, f.User, f.ToFollow) {
			var s StatusCanFollow
			s.CanFollow = true

			sendFollowStatus, err := json.Marshal(s)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.Write(sendFollowStatus)
			return

		} else if relationships.FollowRequestCheck(s.Db, f.User, f.ToFollow) {
			var s StatusRequested

			s.Requested = true

			sendFollowStatus, err := json.Marshal(s)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.Write(sendFollowStatus)
			return
		} else if relationships.FollowingYouCheck(s.Db, f.User, f.ToFollow) {
			var s StatusFollowing

			s.Following = true

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
