package web

import (
	"encoding/json"
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
	},

	{
		UserID:    2,
		Firstname: "Arnold",
		Lastname:  "Mutungi",
		Nickname:  "abmutungi",
		AboutText: []string{"Museveni minion"},
		Followers: 9,
		Following: 8,
	},
	{
		UserID:    3,
		Firstname: "Sarmad",
		Lastname:  "Khatri",
		Nickname:  "tb38r",
		AboutText: []string{"Toppest of Reds"},
		Followers: 8,
		Following: 12,
	},
	{
		UserID:    1,
		Firstname: "Yonas",
		Lastname:  "Million",
		Nickname:  "nsym",
		AboutText: []string{"I love Harold Kane <3"},
		Followers: 9,
		Following: 11,
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
