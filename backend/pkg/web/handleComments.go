package web

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	comment "github.com/abmutungi/social-network/backend/pkg/comments"
)

func (s *Server) handleComment() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		err := r.ParseMultipartForm(10 << 20)
		if err != nil {
			fmt.Printf("error parsing comment form: %v", err)
		}

		postIDtoInt, _ := strconv.Atoi(r.Form.Get("postID"))
		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		comment.StoreComment(s.Db, postIDtoInt, r.Form.Get("textContent"), r.Form.Get("imageContent"))
	}
}
