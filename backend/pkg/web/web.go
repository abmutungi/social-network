package web

import (
	"database/sql"
	"net/http"
)

// func (s *Server) Home(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprint(w, "Hello")
// 	fmt.Println("Server")

// }

func (s *Server) OpenServer(db *sql.DB) {
	srv := Server{
		Serve: &http.Server{
			Addr:    ":8080",
			Handler: &s.Router,
		},
		Db: db,
	}

	s.Routes()
	srv.Serve.ListenAndServe()
	s.Serve = srv.Serve

}
