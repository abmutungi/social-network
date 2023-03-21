package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/abmutungi/social-network/backend/pkg/login"
	"github.com/abmutungi/social-network/backend/pkg/notifications"
	"github.com/abmutungi/social-network/backend/pkg/users"
	uuid "github.com/gofrs/uuid"
)

var (
	OnlineUsersSessionsMap = make(map[int]string)
	SessionsStructMap      = map[string]Session{}
)

type LoginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Message     string `json:"loginMsg"`
	ErrorExists bool   `json:"error"`
	User        users.User
}

func (lr *LoginResponse) PopulateLoginDataResponse(db *sql.DB, email string) {
	u := users.ReturnSingleUser(db, email)
	lr.User.UserID = u.UserID
	lr.User.Email = u.Email
	lr.User.Firstname = u.Firstname
	lr.User.Lastname = u.Lastname
	lr.User.DOB = u.DOB
	lr.User.Avatar = u.Avatar
	lr.User.Nickname = u.Nickname
	lr.User.AboutText = u.AboutText
	lr.User.Privacy = u.Privacy
	lr.User.Created = u.Created
	if notifications.NotificationCheck(db, lr.User.UserID) {
		lr.User.Notifications = true
	} else {
		lr.User.Notifications = false
	}
}

func (s *Server) HandleLogin() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		var loginResponse LoginResponse
		loginData, err := io.ReadAll(r.Body)
		if err != nil {
			fmt.Println(err)
		}

		var ld LoginData

		json.Unmarshal(loginData, &ld)
		fmt.Println(ld.Email)
		fmt.Println(ld.Password)

		if !login.EmailExists(s.Db, ld.Email) {
			fmt.Println("Email missing!")
			sendLoginMessage(w, loginResponse, true, "Email doesn't exist, please register or try again!")
			return
		} else {
			if !login.CorrectPassword(s.Db, ld.Email, ld.Password) {
				sendLoginMessage(w, loginResponse, true, "Wrong password entered, try again!")
				return
			} else {
				loginResponse.PopulateLoginDataResponse(s.Db, ld.Email)
				LoggedInCheck(r, w, users.ReturnSingleUser(s.Db, ld.Email).UserID)
				giveUserCookieOnLogIn(w, r, users.ReturnSingleUser(s.Db, ld.Email).UserID, uuid.Must(uuid.NewV4()))
				sendLoginMessage(w, loginResponse, false, "Successful log in")

			}
		}
	}
}

func sendLoginMessage(w http.ResponseWriter, loginResp LoginResponse, errExists bool, msg string) {
	loginResp.Message = msg
	loginResp.ErrorExists = errExists
	fmt.Println("loginresp struct check -> ", loginResp)
	resp, err := json.Marshal(loginResp)
	if err != nil {
		fmt.Println("Error marshalling error message struct --> ", err)
	}

	(w).Write([]byte(resp))
}

// Function to give a cookie on login
func giveUserCookieOnLogIn(w http.ResponseWriter, r *http.Request, userID int, id uuid.UUID) {
	//stringUserID := strconv.Itoa(userID)
	sessionToken := id.String()
	expiresAt := time.Now().Add(time.Minute * 240)

	SessionsStructMap[sessionToken] = Session{
		UserID: userID,
		Expiry: expiresAt,
	}

	c := &http.Cookie{
		Name:     "session_cookie",
		Value:    sessionToken,
		Expires:  expiresAt,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(w, c)

	OnlineUsersSessionsMap[userID] = c.Value

	for _, cookie := range r.Cookies() {
		fmt.Println()
		fmt.Println("Name : ", cookie.Name)
		fmt.Println("Value/UUID : ", cookie.Value)
	}

	fmt.Println("Session Struct Map ==> ", SessionsStructMap)
	fmt.Println("First time log-in successful")
	fmt.Println(OnlineUsersSessionsMap)
}

func LoggedInCheck(r *http.Request, w http.ResponseWriter, id int) {
	fmt.Println("Entered LoggedInCheck Function")
	// c, err := r.Cookie("session_cookie")
	// if err != nil {
	// 	fmt.Println("Error occurred -> ", err)
	// 	return
	// }
	// fmt.Println("Cookie -> ", c)
	// sessionToken := c.Value

	for k, v := range SessionsStructMap {
		if v.UserID == id {
			fmt.Println("Match is -> ", SessionsStructMap[k])
			for _, c := range r.Cookies() {
				if c.Value == k {
					http.SetCookie(w, &http.Cookie{
						Name:    "session_cookie",
						Value:   "",
						Expires: time.Now(),
					})
				}
			}
			v.Expiry = time.Now()
			delete(SessionsStructMap, k)
		}
	}
	fmt.Println("After alleged deletion--> ", SessionsStructMap)

	// _, exists := SessionsStructMap[sessionToken]
	// if !exists {

	// 	return
	// } else {
	// 	fmt.Println("deleting from map")
	// 	delete(SessionsStructMap, sessionToken)
	// 	fmt.Println("deleted map", SessionsStructMap)
	// 	http.SetCookie(w, &http.Cookie{
	// 		Name:    "session_token",
	// 		Value:   "",
	// 		Expires: time.Now(),
	// 	})

	// }
}

// Need to check if user is in map on login and if not give them a cookie
// if they are in the map then need to check if the cookie has the same value
// as whats in the map, if it doesn't delete that session and give a new
// cookie, if it does then same sesssion carry on?

// Need to check if cookie
