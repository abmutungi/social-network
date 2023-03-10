package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/posts"
	uuid "github.com/gofrs/uuid"
)

type SendGroupPostsAndEvents struct{
	Posts  []groups.GroupPost 
	Events []groups.EventInfo
}

func (s *Server) HandleCreatePost() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		// w.Header().Set("Content-Type", "application/json")

		// data recieved from frontend
		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing createPost form: %v", err)
		}

		fmt.Println(r.Form, "form values")
		fmt.Println(r.Form.Get("textContent"), "text content here")
		fmt.Println(r.Form.Get("imgName"))

		if r.Form.Has("groupID") {
			fmt.Println("TESTING 12")
			//save post to groupposts
			//send back to client to display


			var newFileName string
			// if file is added in form, create file for image and return filename
			if r.Form.Get("imgName") != "" {
				newFileName = s.HandleImage(r, "uploadedPostImg")
			}

			groupIDToInt, _ := strconv.Atoi(r.Form.Get("groupID"))
			GuserIDToInt, _ := strconv.Atoi(r.Form.Get("GuserID"))


			// adding post to the db
			s.Db, _ = sql.Open("sqlite3", "connect-db.db")
			posts.CreateGroupPost(s.Db, groupIDToInt,GuserIDToInt, r.Form.Get("textContent"),newFileName)

	

			sendPosts, err := json.Marshal(groups.GetAllGroupPosts(s.Db,groupIDToInt))
			if err != nil {
				fmt.Println("error sending & marsalling group posts", sendPosts)
			}

			w.Write(sendPosts)

		} else {

			var newFileName string
			// if file is added in form, create file for image and return filename
			if r.Form.Get("imgName") != "" {
				newFileName = s.HandleImage(r, "uploadedPostImg")
			}

			userIDToInt, _ := strconv.Atoi(r.Form.Get("userID"))

			// adding post to the db
			s.Db, _ = sql.Open("sqlite3", "connect-db.db")
			posts.CreatePost(s.Db, userIDToInt, r.Form.Get("textContent"), r.Form.Get("privacy"), newFileName)

			// if custom is chosen
			if r.Form.Get("privacyOption") == "custom" {
				var checkboxArray []string

				// convert checkbox string to array
				err2 := json.Unmarshal([]byte(r.Form.Get("viewers")), &checkboxArray)

				if err2 != nil {
					fmt.Printf("error converting checkbox string into array: %v ", err)
				}

				for i := 0; i < len(checkboxArray); i++ {
					// convent value of string id to int
					id, _ := strconv.Atoi(checkboxArray[i])

					// add each viewer to the post audience table
					posts.AddPostAudience(s.Db, posts.GetLastPostID(s.Db, userIDToInt), id)
				}
			}

			sendPosts, err := json.Marshal(posts.GetAllUserPosts(s.Db, userIDToInt))
			if err != nil {
				fmt.Println("error marshalling posts", sendPosts)
			}

			w.Write(sendPosts)

		}
	}
}

//pretty prints the structs
func prettyPrint(i interface{}) string {
    s, _ := json.MarshalIndent(i, "", "\t")
    return string(s)
}


func (s *Server) TestDBfunctions() {
	s.Db, _ = sql.Open("sqlite3", "connect-db.db")
	// fmt.Println(posts.GetAllUserPosts(s.Db, 1))
	// fmt.Println(relationships.GetAllFollowers(s.Db, 3))

	fmt.Printf("%+v\n",prettyPrint(groups.GetAllGroupPosts(s.Db, 1)))
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

// sending ALL posts depending on which user has been clicked.
func (s *Server) HandleSendUserPosts() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		// use the form to get the userID
		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing userID form: %v", err)
		}

		fmt.Println("What is it!?", r.Form)

		if r.Form.Has("userID") {

			// convert id to int
			userIdInt, _ := strconv.Atoi((r.Form.Get("userID")))

			fmt.Println("clicked USER ID =====>", userIdInt)


			groupIdInt, _ := strconv.Atoi((r.Form.Get("groupID")))
			fmt.Println("GROUPID -->>--", groupIdInt)
			// getall posts from db
			s.Db, _ = sql.Open("sqlite3", "connect-db.db")

			var postsToSend []posts.Post = posts.GetAllUserPosts(s.Db, userIdInt)
			// fmt.Println(postsToSend)
			marshalPosts, _ := json.Marshal(postsToSend)

			w.Header().Set("Content-Type", "application/json")
			w.Write(marshalPosts)

		}

		if r.Form.Has("groupID") {
			// conver id to int
			groupIdInt, _ := strconv.Atoi((r.Form.Get("groupID")))
			fmt.Println("GROUPID -->>--", groupIdInt)

			userIdInt, _ := strconv.Atoi((r.Form.Get("GuserID")))
			fmt.Println("GuserID -->>--", userIdInt)


	// getall posts from db
	s.Db, _ = sql.Open("sqlite3", "connect-db.db")


	var postsToSend []groups.GroupPost = groups.GetAllGroupPosts(s.Db, groupIdInt)
	var eventsToSend []groups.EventInfo = groups.GetEventInfo(s.Db, groupIdInt )

	SendAll := SendGroupPostsAndEvents {
		postsToSend,
		eventsToSend,

	}
	
	 fmt.Println("TOSEND IN HANDLEPOSTS! -- - ", SendAll)
	marshalPosts, _ := json.Marshal(SendAll)

	w.Header().Set("Content-Type", "application/json")
	w.Write(marshalPosts)

		}

	}
}

