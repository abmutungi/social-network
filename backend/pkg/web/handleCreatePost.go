package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/posts"
)

func (s *Server) handleCreatePost() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// data recieved from frontend
		data, err := io.ReadAll(r.Body)

		if err != nil {
			fmt.Printf("error from createPost request: %v", err)
		}

		fmt.Println(string(data), "here is the data before unmarshall")

		// variable to hold json data after its unmarshalled
		var cPD posts.Post

		json.Unmarshal(data, &cPD)
		
		fmt.Println("createPostdata",cPD)

		// store post data in database
		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		posts.CreatePost(s.Db, cPD.TextContent, cPD.Privacy,cPD.ImagePath)

	}
}