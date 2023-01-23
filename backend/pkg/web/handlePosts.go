package web

import (
	"database/sql"
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
		// data, err := io.ReadAll(r.Body)

		// if err != nil {
		// 	fmt.Printf("error from createPost request: %v", err)
		// }

		// // variable to hold json data after its unmarshalled
		// var cPD posts.Post

		// json.Unmarshal(data, &cPD)
		
		// fmt.Println("createPostdata",cPD)

		// // store post data in database
		// s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		// posts.CreatePost(s.Db, cPD.TextContent, cPD.Privacy,cPD.ImagePath)
		// // w.Header().Set("Content-Type", "application/json")
		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing createPost form: %v", err)
		}

		fmt.Println(r.Form.Get("textContent"), "text content here")
		fmt.Println(r.Form.Get("imgName"))
		// if file name is not empty handle saving the file
		if r.Form.Get("imgName") != ""{
			s.HandleImage(r)
		}

		// adding post to the db
		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		posts.CreatePost(s.Db,r.Form.Get("textContent") , r.Form.Get("privacy"), r.Form.Get("imgName"))

	}
}

func (s *Server) TestDBfunctions() {
	s.Db, _ = sql.Open("sqlite3", "connect-db.db")
	fmt.Println(posts.GetAllUserPosts(s.Db, 1))
}

func (s *Server) HandleImage(r *http.Request) {
		file, fileInfo, err:= r.FormFile("uploadedPostImg")

		if err != nil {
			fmt.Printf("failed to get image: %v", err)
			return
		}
		defer file.Close()

		// creating the file in the specific path needed
		dst, err := os.Create("../frontend/src/assets/img/" + fileInfo.Filename)
		if err != nil {
			fmt.Printf("error creating file: %v", err)
			return 
		}
		defer dst.Close()

		io.Copy(dst, file)
	
}