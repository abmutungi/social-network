package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Session struct {
	UserID int
	Expiry time.Time
}

type ClientMessage struct {
	Msg string `json:"msg"`
}

// we'll use this method later to determine if the session has expired
func (s Session) isExpired() bool {
	return s.Expiry.Before(time.Now())
}

func LogInPageSessionChecker(HandlerFunc http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var lr LoginResponse
		// data, _ := io.ReadAll(r.Body)
		// fmt.Println("checking r in middle", string(data))
		enableCors(&w)
		if len(r.Cookies()) == 0 {

			HandlerFunc.ServeHTTP(w, r)
		} else {
			//lr.User = CurrentUser
			sendLoginMessage(w, lr, true, "User is already logged in")
			http.Redirect(w, r, "http://localhost:5173/", http.StatusSeeOther)
		}

	}
}

func (s *Server) GeneralSessionChecker(HandlerFunc http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		// for _, c := range r.Cookies() {
		// 	fmt.Println("COOKIE LOOP -> ", c)
		// }
		c, err := r.Cookie("session_cookie")
		if err != nil {
			// if err == http.ErrNoCookie {
			//handle there being no cookie
			fmt.Println("ERROR IN GSC --> ", err)
			var cm ClientMessage
			cm.Msg = "No cookie, send back to login"
			d, _ := json.Marshal(cm)
			w.Write([]byte(d))
			//}
			return
		}
		sessionToken := c.Value

		userSession, exists := SessionsStructMap[sessionToken]
		fmt.Println("UserID from cookie --> ", userSession.UserID)
		if !exists {
			//handle there not being a session
			var cm ClientMessage
			cm.Msg = "Invalid session, send back to login"
			c = &http.Cookie{
				Name:   "session_cookie",
				Value:  "",
				Path:   "/",
				MaxAge: -1,
			}
			http.SetCookie(w, c)
			fmt.Println("MAP AFTER MSG SENT --> ", SessionsStructMap)
			d, _ := json.Marshal(cm)
			w.Write([]byte(d))

			return
		}
		if userSession.isExpired() {
			fmt.Println("SESSION HAS EXPIRED")
			delete(SessionsStructMap, sessionToken)
			var cm ClientMessage

			cm.Msg = "No cookie, send back to login"
			d, _ := json.Marshal(cm)
			w.Write([]byte(d))
			return
		}
		HandlerFunc.ServeHTTP(w, r)

	}
}
