package web

// type GroupEvent struct {
// 	Creator int `json:"creator"`
// 	GroupID int `json:"groupID"`

// }

// Adds a new group event to the db (need to return this on the group's wall immediately)
// func (s *Server) CreateGroupEvent() http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		enableCors(&w)

// 		err := r.ParseMultipartForm(10 << 20)
// 		if err != nil {
// 			fmt.Println("err parsing within creategroupevent", err)
// 		}

// 		// for key, value := range r.Form {
// 		// 	fmt.Printf("%s = %s\n", key, value)
// 		// }

// 		groupid, err := strconv.Atoi(r.Form.Get("GroupID"))
// 		if err != nil {
// 			fmt.Println("Error converting string to int, CreateGroupEvent fn()")
// 		}

// 		creatorid, err := strconv.Atoi(r.Form.Get("creator"))
// 		if err != nil {
// 			fmt.Println("Error converting string to int, CreateGroupEvent fn()")
// 		}

// 		// get all group members then update the notifications table,
// 		// then create entries within the notication table
// 		allgroupmembers := groups.GetAllGroupMembers(s.Db, groupid)
// 		fmt.Println("all-group-members", allgroupmembers)

// 		for _, member := range allgroupmembers {
// 			groups.UpdateNotifcationTablePostEventCreation(s.Db, "eventInvite", member, creatorid, groupid)
// 		}

// 		groups.CreateGroupEvent(s.Db, groupid, creatorid, r.Form.Get("eventName"), r.Form.Get("eventDescription"), r.Form.Get("eventStartDate"))

// 		message := fmt.Sprintf("The Event %s has been added to the database", r.Form.Get("eventName"))
// 		createGroupEventResponse, err := json.Marshal(message)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}
// 		w.Write([]byte(createGroupEventResponse))
// 	}
// }
