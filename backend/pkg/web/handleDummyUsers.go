package web

import (
	"encoding/json"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/users"
)

type User struct {
	UserID    int
	Email     string
	Password  string
	Firstname string
	Lastname  string
	DOB       string
	Nickname  string
	Avatar    string
	AboutText []string
	Privacy   int
	Created   string

	// Followers int
	// Following int
}

// var AllUsers = []User{

// 	{
// 		UserID:    1,
// 		Firstname: "Tolu",
// 		Lastname:  "Lawal",
// 		Nickname:  "tb38r",
// 		AboutText: []string{"Kang is inevitable"},
// 		Followers: 10,
// 		Following: 9,
// 		Privacy:   1,
// 	},

// 	{
// 		UserID:    2,
// 		Firstname: "Arnold",
// 		Lastname:  "Mutungi",
// 		Nickname:  "abmutungi",
// 		AboutText: []string{"Museveni minion"},
// 		Followers: 9,
// 		Following: 8,
// 		Privacy:   2,
// 	},
// 	{
// 		UserID:    3,
// 		Firstname: "Sarmad",
// 		Lastname:  "Khatri",
// 		Nickname:  "eternal17",
// 		AboutText: []string{"Toppest of Reds"},
// 		Followers: 8,
// 		Following: 12,
// 		Privacy:   1,
// 	},
// 	{
// 		UserID:    4,
// 		Firstname: "Yonas",
// 		Lastname:  "Million",
// 		Nickname:  "nsym",
// 		AboutText: []string{"I <3 Harold Kane"},
// 		Followers: 9,
// 		Following: 11,
// 		Privacy:   2,
// 	},
// }

func (s *Server) HandleDummyUsers() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		//s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		databaseusers := users.GetAllUserData(s.Db)

		Users, err := json.Marshal(databaseusers)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(Users)
	}
}
