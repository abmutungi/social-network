package web

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	UserID    int
	Firstname string
	Lastname  string
	Nickname  string
	AboutText []string
	Followers int
	Following int
	Privacy int
}

var AllUsers = []User{

	{
		UserID:    1,
		Firstname: "Tolu",
		Lastname:  "Lawal",
		Nickname:  "tb38r",
		AboutText: []string{"Kang is inevitable"},
		Followers: 10,
		Following: 9,
		Privacy: 1,
	},

	{
		UserID:    2,
		Firstname: "Arnold",
		Lastname:  "Mutungi",
		Nickname:  "abmutungi",
		AboutText: []string{"Museveni minion"},
		Followers: 9,
		Following: 8,
		Privacy: 2,

	},
	{
		UserID:    3,
		Firstname: "Sarmad",
		Lastname:  "Khatri",
		Nickname:  "eternal17",
		AboutText: []string{"Toppest of Reds"},
		Followers: 8,
		Following: 12,
		Privacy: 1,

	},
	{
		UserID:    4,
		Firstname: "Yonas",
		Lastname:  "Million",
		Nickname:  "nsym",
		AboutText: []string{"I <3 Harold Kane"},
		Followers: 9,
		Following: 11,
		Privacy: 2,

	},
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func (s *Server) HandleDummyUsers() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		enableCors(&w)

		AllUsers, err := json.Marshal(AllUsers)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(AllUsers)


	}

}

func (s *Server) HandleProfileID() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.Body)

		enableCors(&w)

	


	}

}
