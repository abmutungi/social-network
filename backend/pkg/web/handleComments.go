package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	comment "github.com/abmutungi/social-network/backend/pkg/comments"
)

func (s *Server) handleComment() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data, err := io.ReadAll(r.Body)
		if err != nil {
			fmt.Printf("error from create comment request: %v", err)
		}

		var cd comment.Comment

		json.Unmarshal(data, &cd)
		
		fmt.Println("comments json",cd)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		comment.StoreComment(s.Db, cd.TextContent, cd.ImageContent)
	}
}