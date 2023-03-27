package web

func (s *Server) Routes() {
	// s.Router.HandleFunc("/", s.Home)
	s.Router.HandleFunc("/register", s.HandleRegister())
	s.Router.HandleFunc("/follow", s.GeneralSessionChecker(s.HandlePublicFollow()))
	s.Router.HandleFunc("/followCheck", s.GeneralSessionChecker(s.HandleFollowCheck()))
	s.Router.HandleFunc("/unfollow", s.GeneralSessionChecker(s.HandleUnfollow()))
	s.Router.HandleFunc("/updatePrivacy", s.GeneralSessionChecker(s.HandlePrivacyUpdate()))
	s.Router.HandleFunc("/displayNotif", s.GeneralSessionChecker(s.HandleNotifDisplay()))
	s.Router.HandleFunc("/checkNotif", s.GeneralSessionChecker(s.HandleNotifCheck()))
	s.Router.HandleFunc("/actionNotif", s.GeneralSessionChecker(s.HandleActionNotif()))
	s.Router.HandleFunc("/upgradesocket", s.GeneralSessionChecker(s.UpgradeConnection))

	s.Router.HandleFunc("/dummyusers", s.HandleDummyUsers())
	s.Router.HandleFunc("/getgroupdata", s.HandleGroups())

	s.Router.HandleFunc("/login", (s.HandleLogin()))
	s.Router.HandleFunc("/logout", s.HandleLogout())
	s.Router.HandleFunc("/frontendlogin", s.frontendLogin())
	s.Router.HandleFunc("/createpost", s.HandleCreatePost())
	s.Router.HandleFunc("/storecomment", s.handleComment())
	s.Router.HandleFunc("/myposts", s.HandleSendUserPosts())
	s.Router.HandleFunc("/creategroup", s.HandleCreateGroup())
	s.Router.HandleFunc("/isgroupmember", s.IsGroupMember())
	// s.Router.HandleFunc("/creategroupevent", s.CreateGroupEvent())
	s.Router.HandleFunc("/mychatusers", s.HandleMyChatUsers())
	s.Router.HandleFunc("/sendprivatemessage", s.SendChatHistory())
	s.Router.HandleFunc("/chatnotificationsonlogin", s.HandleChatNotificationsOnLogin())

	s.Router.HandleFunc("/myfollowers", s.HandleUserFollowers())
	s.Router.HandleFunc("/groupinvite", s.HandleGroupInvite())
	s.Router.HandleFunc("/getgroupinvitees", s.HandleGetGroupInvitees())
	s.Router.HandleFunc("/getnavdata", s.HandleGetNavData())


	s.Router.HandleFunc("/mygroupchats", s.HandleMyGroupChats())
	s.Router.HandleFunc("/sendgroupmessages", s.HandleSendGroupMessages())

	// s.TestDBfunctions()
}
