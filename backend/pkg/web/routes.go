package web

func (s *Server) Routes() {
	// s.Router.HandleFunc("/", s.Home)
	s.Router.HandleFunc("/register", s.HandleRegister())
	// s.Router.HandleFunc("/", s.handleCreatePost())
	s.Router.HandleFunc("/", s.handleComment())
	// s.TestDBfunctions()
}
