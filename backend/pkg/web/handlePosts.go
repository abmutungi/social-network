package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"

	comment "github.com/abmutungi/social-network/backend/pkg/comments"
	"github.com/abmutungi/social-network/backend/pkg/posts"
	uuid "github.com/gofrs/uuid"
)

func (s *Server) HandleCreatePost() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// enableCors(&w)
		// // w.Header().Set("Content-Type", "application/json")

		// data recieved from frontend
		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing createPost form: %v", err)
		}

		fmt.Println(r.Form, "form values")
		fmt.Println(r.Form.Get("textContent"), "text content here")
		fmt.Println(r.Form.Get("imgName"))

		var newFileName string
		// if file is added in form, create file for image and return filename
		if r.Form.Get("imgName") != "" {
			newFileName = s.HandleImage(r, "uploadedPostImg")
		}

		fmt.Println("USERID for posts ********", r.Form.Get("userID"))
		userIDToInt, _ := strconv.Atoi(r.Form.Get("userID"))

		fmt.Println("new file name", newFileName)
		// adding post to the db
		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		posts.CreatePost(s.Db, userIDToInt, r.Form.Get("textContent"), r.Form.Get("privacy"), newFileName)

	}
}

func (s *Server) TestDBfunctions() {
	s.Db, _ = sql.Open("sqlite3", "connect-db.db")
	// fmt.Println(posts.GetAllUserPosts(s.Db, 1))
	fmt.Println(comment.GetAllComments(s.Db, 1))
}

func (s *Server) HandleImage(r *http.Request, formImageName string) string {
	file, fileInfo, err := r.FormFile(formImageName)

	if err != nil {
		fmt.Printf("failed to get image: %v", err)
	}
	defer file.Close()

	// creating the file in the specific path needed

	// create a randomly generated string using the uuid package. Add to filename so its unique.
	randomID, _ := uuid.NewV4()

	randomIDToString := randomID.String()[:10]

	dst, err := os.Create("../frontend/src/assets/img/ext/" + randomIDToString + "-" + fileInfo.Filename)

	newFileName := randomIDToString + "-" + fileInfo.Filename
	if err != nil {
		fmt.Printf("error creating file: %v", err)
	}
	defer dst.Close()

	io.Copy(dst, file)

	// return string to be passed on as image file name in db
	return newFileName
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

		fmt.Println("clicked USER ID =====>", userIdInt)
		// getall posts from db
		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		var postsToSend []posts.Post = posts.GetAllUserPosts(s.Db, userIdInt)
		// fmt.Println(postsToSend)
		marshalledPosts, _ := json.Marshal(postsToSend)

		w.Header().Set("Content-Type", "application/json")
		w.Write(marshalledPosts)

	}
}
