package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/abmutungi/social-network/backend/pkg/login"
	uuid "github.com/gofrs/uuid"
)

var OnlineUsersSessionsMap = make(map[string]string)

type LoginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Message          string `json:"loginMsg"`
	ErrorExists      bool   `json:"error"`
	CurrentUserID    int    `json:"currentUserID"`
	CurrentUserEmail string `json:"currentUserEmail"`
	CurrentUserFName string `json:"currentUserFName"`
	CurrentUserLName string `json:"currentUserLName"`
}

func (lr *LoginResponse) PopulateLoginDataResponse(userID int, userEmail, userFName, userLName string) {
	lr.CurrentUserID = userID
	lr.CurrentUserEmail = userEmail
	lr.CurrentUserFName = userFName
	lr.CurrentUserLName = userLName
}

func (lr *LoginResponse) GetCurrentUserID() string {

	return strconv.Itoa(lr.CurrentUserID)

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
				loginResponse.PopulateLoginDataResponse(login.GetUserID(s.Db, ld.Email), ld.Email, login.GetUserFullName(s.Db, ld.Email)[0], login.GetUserFullName(s.Db, ld.Email)[1])
				giveUserCookieOnLogIn(w, r, login.GetUserID(s.Db, ld.Email), uuid.Must(uuid.NewV4()))
				sendLoginMessage(w, loginResponse, false, "Successful log in")

			}
		}
	}
}

func sendLoginMessage(w http.ResponseWriter, loginResp LoginResponse, errExists bool, msg string) {
	loginResp.Message = msg
	loginResp.ErrorExists = errExists
	fmt.Println("rr check -> ", loginResp)
	resp, err := json.Marshal(loginResp)
	if err != nil {
		fmt.Println("Error marshalling error message struct --> ", err)
	}

	(w).Write([]byte(resp))

}

// Function to give a cookie on login
func giveUserCookieOnLogIn(w http.ResponseWriter, r *http.Request, userID int, id uuid.UUID) {

	stringUserID := strconv.Itoa(userID)

	c := &http.Cookie{
		Name:     stringUserID,
		Value:    id.String(),
		Expires:  time.Now().Add(time.Minute * 60),
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(w, c)

	OnlineUsersSessionsMap[stringUserID] = c.Value

	for _, cookie := range r.Cookies() {
		fmt.Println()
		fmt.Println("Name : ", cookie.Name)
		fmt.Println("Value/UUID : ", cookie.Value)
	}

	fmt.Println("First time log-in successful")
	fmt.Println(OnlineUsersSessionsMap)

}

//Need to check if user is in map on login and if not give them a cookie
//if they are in the map then need to check if the cookie has the same value
// as whats in the map, if it doesn't delete that session and give a new
//cookie, if it does then same sesssion carry on?

//Need to check if cookie