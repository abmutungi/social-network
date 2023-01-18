package web

import (
	"database/sql"
	"net/http"
)

type Server struct {
	Db     *sql.DB
	Router http.ServeMux
	Serve  *http.Server
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	s.Router.ServeHTTP(w, r)
}
