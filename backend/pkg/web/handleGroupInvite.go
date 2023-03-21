package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/notifications"
)

type InvitedToGroup struct {
	GroupID string `json:"groupID"`
	Invited string `json:"invitedID"`
	Inviter int    `json:"inviter"`
}

func (s *Server) HandleGroupInvite() http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		enableCors(&w)

		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing createPost form: %v", err)
		}

		fmt.Println("HandleGroupInvite Stuff", r.Form.Get("data"))

		var result []InvitedToGroup

		er := json.Unmarshal([]byte(r.Form.Get("data")), &result)
		if er != nil {
			fmt.Println("Error unmarshaling GroupInvite JSON:", er)
			return
		}

		fmt.Println("GroupInviteData", result)

		for _, obj := range result {
			invited, err := strconv.Atoi(obj.Invited)
			if err != nil {
				fmt.Println("Error parsing invited string", err)
			}

			gid, err := strconv.Atoi(obj.GroupID)
			if err != nil {
				fmt.Println("Error parsing invited string", err)
			}

			notifications.StoreNotification(s.Db, "groupInvite", invited, obj.Inviter, gid)
			//fmt.Println("from loop", prettyPrint(obj))
		}

	}

}