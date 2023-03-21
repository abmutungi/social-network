package web

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	//"github.com/abmutungi/social-network/backend/pkg/chats"
	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/notifications"
	"github.com/abmutungi/social-network/backend/pkg/relationships"
	"github.com/gorilla/websocket"
)

var (
	loggedInSockets = make(map[int]*websocket.Conn)
	// broadcastChannelChats  = make(chan chats.Chat, 1)
	broadcastChannelGroupNotifs = make(chan notifications.Notification, 1)
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type T struct {
	TypeChecker
	*notifications.Notification
	//*chats.Chat
	*FollowerPrivateData
	*GroupData
	// *Test
	*InvitedToGroup
}

type TypeChecker struct {
	Type string `json:"type"`
}

func (t *T) UnmarshalData(data []byte) error {
	if err := json.Unmarshal(data, &t.TypeChecker); err != nil {
		log.Println("Error receiving data type")
	}

	switch t.Type {
	case "followNotifs":
		t.FollowerPrivateData = &FollowerPrivateData{}
		return json.Unmarshal(data, t.FollowerPrivateData)
	case "groupNotifs":
		t.GroupData = &GroupData{}
		return json.Unmarshal(data, t.GroupData)
	case "groupInviteNotifs":
		t.InvitedToGroup = &InvitedToGroup{}
		return json.Unmarshal(data, t.InvitedToGroup)
	default:
		return fmt.Errorf("unrecognized type value %q", t.Type)

	}
}

func (s *Server) UpgradeConnection(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	wsConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("error upgrading connection: %v", err)
	}

	defer wsConn.Close()

	c, _ := r.Cookie("session_cookie")

	sessionToken := c.Value

	userSession, exists := SessionsStructMap[sessionToken]
	if !exists {
		log.Println("Error getting session info from cookie")
	}

	loggedInSockets[userSession.UserID] = wsConn
	fmt.Println("+++++++++++++++++++++++++++WEBSOCKET GRANTED++++++++++++++++++++++++++++=")
	fmt.Println("socket map --> ", loggedInSockets)

	var f T

	for {
		message, info, _ := wsConn.ReadMessage()
		fmt.Println("----===> ", string(info))
		fmt.Println("----", message)
		fmt.Println("--f.type--", f.Type)
		if message == -1 {
			fmt.Println("connection closed")
			return
		}

		f.UnmarshalData(info)

		if f.Type == "followNotifs" {

			// store follow notification
			if !relationships.FollowingYouCheck(s.Db, f.Notifiyee, f.Notifier) {
				notifications.StoreNotification(s.Db, "followRequest", f.Notifiyee, f.Notifier, 0)
			} else {
				fmt.Println("Relationship not added to the db as already follow this user")
			}

			fmt.Println("******************* ws notifs: followRequest ************************")
			f.FollowerPrivateData.Tipo = "followNotifs"

			for user, conn := range loggedInSockets {
				if user == f.Notifiyee {
					fmt.Printf("*********************** %v has new notifications ***********************************", user)
					conn.WriteJSON(notifications.GetNotifications(s.Db, user))
				}
			}
			// broadcastChannelGroupNotifs <- notifications.GetNotifications()

		}

		if f.Type == "groupNotifs" {

			if !groups.GroupMemberCheck(s.Db, f.Group, f.User) {
				notifications.StoreNotification(s.Db, "groupRequest", groups.GetCreator(s.Db, f.Group), f.User, f.Group)
			} else {
				fmt.Println("Membership not added to the db as already part of group")
			}
			fmt.Println("******************* ws notifs: groupRequest ************************")
			f.GroupData.Tipo = "groupNotifs"

			for user, conn := range loggedInSockets {
				if user == groups.GetCreator(s.Db, f.Group) {
					fmt.Printf("*********************** %v has new notifications ***********************************", user)
					conn.WriteJSON(notifications.GetNotifications(s.Db, user))
				}
			}

		}
		if f.Type == "groupInviteNotifs" {
			// use channels

		}
	}
	// else {
	// }
}
