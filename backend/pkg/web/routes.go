package web

func (s *Server) Routes() {
	// s.Router.HandleFunc("/", s.Home)
	s.Router.HandleFunc("/register", s.HandleRegister())
	s.Router.HandleFunc("/createpost", s.HandleCreatePost())
	s.Router.HandleFunc("/storecomment", s.handleComment())
	s.Router.HandleFunc("/myposts", s.HandleSendUserPosts())
	// s.TestDBfunctions()

}
