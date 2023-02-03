package web

func (s *Server) Routes() {
	// s.Router.HandleFunc("/", s.Home)
	s.Router.HandleFunc("/register", s.HandleRegister())
	s.Router.HandleFunc("/follow", s.GeneralSessionChecker(s.HandlePublicFollow()))
	s.Router.HandleFunc("/followRequest", s.GeneralSessionChecker(s.HandlePrivateFollow()))
	s.Router.HandleFunc("/followCheck", s.GeneralSessionChecker(s.HandleFollowCheck()))

	s.Router.HandleFunc("/unfollow", s.GeneralSessionChecker(s.HandleUnfollow()))
	s.Router.HandleFunc("/updatePrivacy", s.GeneralSessionChecker(s.HandlePrivacyUpdate()))

	s.Router.HandleFunc("/dummyusers", s.HandleDummyUsers())
	s.Router.HandleFunc("/getgroupdata", s.HandleGroups())

	s.Router.HandleFunc("/login", (s.HandleLogin()))
	s.Router.HandleFunc("/logout", s.HandleLogout())
	s.Router.HandleFunc("/frontendlogin", s.frontendLogin())
	s.Router.HandleFunc("/createpost", s.HandleCreatePost())
	s.Router.HandleFunc("/storecomment", s.handleComment())
	s.Router.HandleFunc("/myposts", s.HandleSendUserPosts())
	s.Router.HandleFunc("/creategroup", s.HandleCreateGroup())

	s.Router.HandleFunc("/myfollowers", s.HandleUserFollowers())
	// s.TestDBfunctions()

}
