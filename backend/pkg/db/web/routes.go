package web

func (s *Server) Routes() {
	s.Router.HandleFunc("/", s.Home)
}
