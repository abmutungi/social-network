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
		// Db: db.CreateDB("connect-db.db"),
	}

	// err := db.RunMigrationScript(srv.Db)
	// if err != nil {
	// 	log.Fatalf("failed to run migrations: %s", err)
	// }
	s.Routes()

	srv.Serve.ListenAndServe()

}
