package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/posts"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
}


func (s *Server) HandleCreatePost() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// enableCors(&w)
		// // w.Header().Set("Content-Type", "application/json")

		// data recieved from frontend
		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing createPost form: %v", err)
		}

		fmt.Println(r.Form.Get("textContent"), "text content here")
		fmt.Println(r.Form.Get("imgName"))
		
		// if file is added in form 
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

func (s *Server) HandleSendUserPosts() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		
		// use the form to get the userID
		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing userID form: %v", err)
		}
		
		// conver id to int
		userIdInt, _ := strconv.Atoi((r.Form.Get("userID")))
		
		// getall posts from db
		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		

		var postsToSend []posts.Post = posts.GetAllUserPosts(s.Db, userIdInt)

		marshalledPosts, _ := json.Marshal(postsToSend)

		w.Header().Set("Content-Type", "application/json")
		w.Write(marshalledPosts)
		
	}
}