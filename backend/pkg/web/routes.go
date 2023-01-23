package web

func (s *Server) Routes() {
	s.Router.HandleFunc("/", s.Home)
	s.Router.HandleFunc("/register", s.HandleRegister())
	s.Router.HandleFunc("/follow", s.HandlePublicFollow())
	s.Router.HandleFunc("/followRequest", s.HandlePrivateFollow())
}
