package web

import (
	"net/http"
)

// func (s *Server) Home(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprint(w, "Hello")
// 	fmt.Println("Server")

// }

func (s *Server) OpenServer() {
	srv := Server{
		Serve: &http.Server{
			Addr:    ":8080",
			Handler: &s.Router,
		},
	}

	s.Routes()

	srv.Serve.ListenAndServe()

}
