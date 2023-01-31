package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/users"
)

type PrivacyUpdate struct {
	UserID        int  `json:"loggedInUserID"`
	PrivacyStatus bool `json:"privacyStatus"`
}

func (s *Server) HandlePrivacyUpdate() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println(string(data))

		var p PrivacyUpdate

		json.Unmarshal(data, &p)

		fmt.Println("logged in user from privacybtn:", p.UserID)
		fmt.Println("true or false", p.PrivacyStatus)

		if p.PrivacyStatus {
			users.UpdatePrivacy(s.Db, 1, p.UserID)
		} else {
			users.UpdatePrivacy(s.Db, 0, p.UserID)
		}
	}
}
