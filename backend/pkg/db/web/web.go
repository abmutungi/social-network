package web

import (
	"fmt"
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Hello")
}

func (s *Server) OpenServer() {

	mux:= s.Router
	
	mux.Handle("/", Home)
	http.ListenAndServe(":8080",mux)
}