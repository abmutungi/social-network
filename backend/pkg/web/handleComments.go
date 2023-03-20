package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	comment "github.com/abmutungi/social-network/backend/pkg/comments"
	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/posts"
)

func (s *Server) handleComment() http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		err := r.ParseMultipartForm(10 << 20)
		if err != nil {
			fmt.Printf("error parsing comment form: %v", err)
		}

		if r.Form.Has("grouppostID") {

		var newFileName string
		// if file is added in form, create file for image and return filename
		if r.Form.Get("imgName") != "" {
			newFileName = s.HandleImage(r, "uploadedCommentImg")
		}
		
		userIDToInt, _ := strconv.Atoi(r.Form.Get("commenterID"))
		groupPostIDToInt, _ := strconv.Atoi(r.Form.Get("grouppostID"))
		textContent := r.Form.Get("textContent")

		comment.StoreGroupPostComment(s.Db, groupPostIDToInt,userIDToInt,textContent,newFileName)
         

	sendPosts, err := json.Marshal(groups.GetAllGroupPosts(s.Db, groupPostIDToInt))
			if err != nil {
				fmt.Println("error marshalling groupposts/comms", sendPosts)
			}

			w.Write(sendPosts)


		}else{


		

		postIDtoInt, _ := strconv.Atoi(r.Form.Get("postID"))

		var newFileName string
		// if file is added in form, create file for image and return filename
		if r.Form.Get("imgName") != "" {
			newFileName = s.HandleImage(r, "uploadedCommentImg")
		}

		commenterIDToInt, _ := strconv.Atoi(r.Form.Get("commenterID"))
		userIDToInt, _ := strconv.Atoi(r.Form.Get("userID"))

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		comment.StoreComment(s.Db, postIDtoInt, commenterIDToInt, r.Form.Get("textContent"), newFileName)

		if userIDToInt == commenterIDToInt {

			sendPosts, err := json.Marshal(posts.GetAllUserPosts(s.Db, userIDToInt))
			if err != nil {
				fmt.Println("error marshalling posts", sendPosts)
			}

			w.Write(sendPosts)
		} else {
			sendPosts, err := json.Marshal(posts.GetClickedProfilePosts(s.Db, userIDToInt, commenterIDToInt))
			if err != nil {
				fmt.Println("error marshalling posts", sendPosts)
			}

			w.Write(sendPosts)
		}

	}
}
}
