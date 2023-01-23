package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/abmutungi/social-network/backend/pkg/posts"
)

// func enableCors(w *http.ResponseWriter) {
// 	(*w).Header().Set("Access-Control-Allow-Origin", "*")
// }

func (s *Server) handleCreatePost() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// enableCors(&w)
		// data recieved from frontend
		data, err := io.ReadAll(r.Body)

		if err != nil {
			fmt.Printf("error from createPost request: %v", err)
		}

		// variable to hold json data after its unmarshalled
		var cPD posts.Post

		json.Unmarshal(data, &cPD)
		
		fmt.Println("createPostdata",cPD)

		// store post data in database
		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		posts.CreatePost(s.Db, cPD.TextContent, cPD.Privacy,cPD.ImagePath)
		// w.Header().Set("Content-Type", "application/json")
	}
}

func (s *Server) TestDBfunctions() {
	s.Db, _ = sql.Open("sqlite3", "connect-db.db")
	fmt.Println(posts.GetAllUserPosts(s.Db, 1))
}

func (s *Server) HandleImage() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// 10MB max file size
		r.ParseMultipartForm(10 << 20) 
		file, fileInfo, err:= r.FormFile("image")

		if err != nil {
			fmt.Printf("failed to get image: %v", err)
			return
		}
		defer file.Close()

		// creating the file in the specific path needed
		dst, err := os.Create("../frontend/src/assets/" + fileInfo.Filename)
		if err != nil {
			fmt.Printf("error creating file: %v", err)
			return 
		}
		defer dst.Close()

		io.Copy(dst, file)
	}
}