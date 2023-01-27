package web

import (
	"net/http"
)

func LogInPageSessionChecker(HandlerFunc http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var lr LoginResponse
		// data, _ := io.ReadAll(r.Body)
		// fmt.Println("checking r in middle", string(data))
		enableCors(&w)
		if len(r.Cookies()) == 0 {

			HandlerFunc.ServeHTTP(w, r)
		} else {
			lr.User = CurrentUser
			sendLoginMessage(w, lr, true, "User is already logged in")
			http.Redirect(w, r, "http://localhost:5173/", http.StatusSeeOther)
		}

	}
}

// func (s *Server) GeneralSessionChecker(HandlerFunc http.HandlerFunc) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
