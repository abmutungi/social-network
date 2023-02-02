package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/relationships"
	"github.com/abmutungi/social-network/backend/pkg/users"
)

func (s *Server) HandleUserFollowers() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing request to get all user followers: %v ", err)
		}

		// fmt.Println(r.Form, "form values")

		// conver id to int
		userIdInt, _ := strconv.Atoi((r.Form.Get("userID")))

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		var followers []users.User = relationships.GetAllFollowers(s.Db, userIdInt)

		marshalFollowers, _ := json.Marshal(followers)
		w.Write(marshalFollowers)
	}

}
