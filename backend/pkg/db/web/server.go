package web

import (
	"database/sql"
	"net/http"
)

type Server struct {
	Db     *sql.DB
	Router *http.ServeMux
	serve  *http.Server
}