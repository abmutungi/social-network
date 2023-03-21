package web

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/users"
)

type LogoutInfo struct {
	UserID    int    `json:"ID"`
	Email     string `json:"Email"`
	UserFName string `json:"FName"`
	UserLName string `json:"LName"`
	User      users.User
	Message   string `json:"logoutMsg"`
	Success   bool   `json:"success"`
	CookieID  string `json:"CookieID"`
}

type UserCheck struct {
	Message string `json:"Msg"`
	Resp    bool   `json:"resp"`
}

func (s *Server) HandleLogout() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		var loInfo LogoutInfo

		c, err := r.Cookie("session_cookie")

		if err != nil {
			fmt.Println("Error looking for cookie on log out: ", err)
			return
		}
		sessionToken := c.Value

		userSession, exists := SessionsStructMap[sessionToken]
		if !exists {
			log.Println("Error: User doesn't exists")
		}
		// delete the session
		if c.Value == OnlineUsersSessionsMap[userSession.UserID] {
			delete(OnlineUsersSessionsMap, userSession.UserID)
		}
		// remove the cookie
		c = &http.Cookie{
			Name:   c.Name,
			Value:  "",
			MaxAge: -1,
		}
		http.SetCookie(w, c)
		sendLogoutMessage(w, loInfo, true, "User cookie deleted and logged out")
		fmt.Println("User logged out and redirected to the log-in page")
	}
}

func sendLogoutMessage(w http.ResponseWriter, logoutResp LogoutInfo, success bool, msg string) {
	logoutResp.Message = msg
	logoutResp.Success = success
	fmt.Println("logout message check -> ", logoutResp)
	resp, err := json.Marshal(logoutResp)
	if err != nil {
		fmt.Println("Error marshalling error message struct --> ", err)
	}
	(w).Write([]byte(resp))
}

func (s *Server) frontendLogin() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		var lrData LogoutInfo
		//Assign session cookie to c
		c, err := r.Cookie("session_cookie")
		if err != nil {
			//if there's an error and its no cookie then send everything cool message
			if err == http.ErrNoCookie {
				lrData.Success = true
				r, errM := json.Marshal(lrData)
				if errM != nil {
					fmt.Println("Error when marshalling response for successful visit to log in: ", errM)
				}
				w.Write(r)
			}
			//not sure what other error it could be here but deal with it just in case
			fmt.Println("Err when retrieving cookie on log in attempt", err)
		} else {

			lrData.Success = false
			//Use the cookie vlaue which is the uuid to get the email from the map
			email := users.GetEmailFromUserID(s.Db, SessionsStructMap[c.Value].UserID)
			lrData.User = users.ReturnSingleUser(s.Db, email)
			fmt.Println("Checking lrData struct in feLogin: ", lrData)
			r, _ := json.Marshal(lrData)
			w.Write(r)
			fmt.Println("Logged in user went to log in frontend check")
		}
	}
}
