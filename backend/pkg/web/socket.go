package web

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	//"github.com/abmutungi/social-network/backend/pkg/chats"
	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/notifications"
	"github.com/abmutungi/social-network/backend/pkg/relationships"
	"github.com/abmutungi/social-network/backend/pkg/chats"
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
	// *chats.Chat
	*NewMessage
}

type TypeChecker struct {
	Type string `json:"type"`
}

// struct for new message

type NewMessage struct {
	LoggedInUserID string `json:"loggedInUser"`
	RecipientID    string `json:"recipientID"`
	MessageContent string `json:"msgContent"`
	Tipo           string `json:"tipo"`
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
	case "notifs":
		t.Notification = &notifications.Notification{}
		return json.Unmarshal(data, t.Notification)
	case "newMessage":
		t.NewMessage = &NewMessage{}
		return json.Unmarshal(data, t.NewMessage)
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


		// for single chat messages

		if f.Type == "newMessage" {

			// store messages here

			senderIdInt, _ := strconv.Atoi(f.LoggedInUserID)

			recipientIdInt, _ := strconv.Atoi(f.RecipientID)
			msgContent := f.MessageContent

			if !chats.ChatHistoryValidation(s.Db, senderIdInt, recipientIdInt).Exists {
				chats.StoreChat(s.Db, senderIdInt, recipientIdInt)

			}

			chats.StorePrivateMessages(s.Db, chats.ChatHistoryValidation(s.Db, senderIdInt, recipientIdInt).ChatID, msgContent, senderIdInt, recipientIdInt)
			// check if recipeint is in the socket map
			f.NewMessage.Tipo = "newMessage"

			for id, conn := range loggedInSockets {
				if recipientIdInt == id || senderIdInt == id {
					conn.WriteJSON(chats.GetAllMessageHistoryFromChat(s.Db, chats.ChatHistoryValidation(s.Db, senderIdInt, recipientIdInt).ChatID))
				}
			}

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

}
