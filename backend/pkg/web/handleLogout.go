package web

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"

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
		data1, _ := io.ReadAll(r.Body)
		json.Unmarshal(data1, &loInfo)
		fmt.Println("checking struct -> ", loInfo)
		fmt.Println("Checking string data -> ", string(data1))
		c, err := r.Cookie(strconv.Itoa(loInfo.UserID))

		if err != nil {
			fmt.Println("Error looking for cookie on log out: ", err)
			return
		}

		// delete the session
		if c.Value == OnlineUsersSessionsMap[c.Name] {
			delete(OnlineUsersSessionsMap, c.Name)
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
		d, _ := io.ReadAll(r.Body)
		fmt.Println("checking d from login -> ", string(d))
		json.Unmarshal(d, &lrData)
		if len(r.Cookies()) == 0 {
			lrData.Success = true
			r, _ := json.Marshal(lrData)
			w.Write(r)
		} else {
			fmt.Println(lrData)
			lrData.Success = false
			email := users.GetEmailFromUserID(s.Db, lrData.CookieID)
			lrData.User = users.ReturnSingleUser(s.Db, email)
			fmt.Println("Checking lrData struct in feLogin: ", lrData)
			r, _ := json.Marshal(lrData)
			w.Write(r)
			fmt.Println("Logged in user went to log in frontend check")
		}
	}
}
