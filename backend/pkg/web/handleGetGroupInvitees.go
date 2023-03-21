package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/users"
)

type CanInvite struct {
	UserID  int
	GroupID int
	Name    string
}

func contains(s []int, val int) bool {
	for _, v := range s {
		if v == val {
			return true
		}
	}

	return false
}

//receives a groupId, returns all non members without pending invites
func (s *Server) HandleGetGroupInvitees() http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("Error from HandleGetGroupInvitees  -->", err)
		}

		gidAsInt, _ := strconv.Atoi(string(data))

		//AllUsers
		AllUsers := users.GetAllUserData(s.Db)
		fmt.Println("All Users from DB", AllUsers)

		fmt.Println("")
		fmt.Println("")

		//AllGroupMembers
		AllGroupMembers := groups.GetAllGroupMembers(s.Db, gidAsInt)
		fmt.Println("All GroupMembers from DB", AllGroupMembers)
		fmt.Println("")
		fmt.Println("")

		//Pending Invites
		PendingInvites := groups.PendingGroupInvite(s.Db, gidAsInt)
		fmt.Println("Pending Invites", PendingInvites)

		var PotentialMembers []CanInvite

		//getting required fields
		for _, user := range AllUsers {
			var a CanInvite
			a.UserID = user.UserID
			a.GroupID = gidAsInt
			a.Name = user.Firstname + " " + user.Lastname

			PotentialMembers = append(PotentialMembers, a)
		}

		fmt.Println("Pot.length()!!", len(PotentialMembers),PotentialMembers)


		var res []CanInvite

		//ommiting existing members
		for _, user := range PotentialMembers {
			if !contains(AllGroupMembers, user.UserID) {
				res = append(res, user)

			}

		}

		fmt.Println("Existing Members Parsed ", len(res), res)


                 var toSend []CanInvite
		//ommiting pending requests
		for _, user := range res {
			if !contains(PendingInvites, user.UserID) {
				toSend = append(toSend, user)

			}

		}

		fmt.Println("Pending Ommited ", len(toSend), toSend)

		InviteInfo, err := json.Marshal(toSend)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write([]byte(InviteInfo))

	}

}
