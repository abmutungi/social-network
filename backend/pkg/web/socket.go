package web

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/chats"
	"github.com/abmutungi/social-network/backend/pkg/groups"
	"github.com/abmutungi/social-network/backend/pkg/notifications"
	"github.com/abmutungi/social-network/backend/pkg/relationships"
	"github.com/abmutungi/social-network/backend/pkg/users"
	"github.com/gorilla/websocket"
)

var loggedInSockets = make(map[int]*websocket.Conn)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type InvitedToGroup struct {
	GroupID string `json:"groupID"`
	Invited string `json:"invitedID"`
	Inviter int    `json:"inviter"`
}

type GroupData struct {
	Group int    `json:"groupID"`
	User  int    `json:"loggedInUserID"`
	Tipo  string `json:"tipo"`
}

type GroupEvent struct {
	EventName        string `json:"eventName"`
	EventDescription string `json:"eventDescription"`
	EventStartDate   string `json:"eventStartDate"`
	Creator          int    `json:"creator"`
	GroupID          int    `json:"groupID"`
	Tipo             string `json:"tipo"`
}

type GroupMembers struct {
	Invitees []InvitedToGroup `json:"Invitees"`
	Tipo     string           `json:"tipo"`
}

type FollowerPrivateData struct {
	NotificationType string `json:"notificationType"`
	Notifiyee        int    `json:"notifiyee"`
	Notifier         int    `json:"notifier"`
	Tipo             string `json:"tipo"`
}

type GroupChatRead struct {
	LoggedInUser int `json:"loggedInUser"`
	GroupID      int `json:"groupID"`
}

type T struct {
	TypeChecker
	*notifications.Notification
	//*chats.Chat
	*FollowerPrivateData
	*GroupData
	// *Test
	// *chats.Chat
	*NewMessage
	*GroupMembers
	*GroupEvent
	*RemoveChatNotif
	*GroupChatRead
}

type TypeChecker struct {
	Type string `json:"type"`
}

// struct for new message

type ChatsToSend struct {
	Chats []chats.Chat `json:"chatsfromgo"`

	Tipo string `json:"tipo"`
}

type ChatSocketNotif struct {
	SocketNotifiersArr []string `json:"socketnotifiers"`
	RecipientID        int      `json:"recID"`
	SenderID           int      `json:"sendID"`
	SenderName         string   `json:"sendName"`
	Tipo               string   `json:"tipo"`
}

type AllNotifs struct {
	SendNotifs []notifications.Notification `json:"allNotifs"`
	Tipo       string                       `json:"tipo"`
}

type UpdateEvents struct {
	GroupEvents []groups.EventInfo`json:"groupEvents"`
	Tipo        string                `json:"tipo"`
}

type NewMessage struct {
	LoggedInUserID string `json:"loggedInUser"`
	RecipientID    string `json:"recipientID"`
	MessageContent string `json:"msgContent"`
	GroupID        string `json:"groupID"`
	Tipo           string `json:"tipo"`
}

type RemoveChatNotif struct {
	RecID     string `json:"loggedInUser"`
	ClickedID string `json:"recipientID"`
	Msg       string `json:"msg"`
	Tipo      string `json:"tipo"`
}

type GroupMessages struct {
	GroupM   []chats.Chat `json:"groupMessages"`
	Tipo     string       `json:"tipo"`
	NewNotif string       `json:"newNotif"`
	GroupIDs []int        `json:"groupIDs"`
	GroupID  int          `json:"groupID"`
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
		t.GroupMembers = &GroupMembers{}
		return json.Unmarshal(data, t.GroupMembers)
	case "eventInviteNotifs":
		t.GroupEvent = &GroupEvent{}
		return json.Unmarshal(data, t.GroupEvent)
	case "newMessage":
		t.NewMessage = &NewMessage{}
		return json.Unmarshal(data, t.NewMessage)
	case "newGroupMessage":
		t.NewMessage = &NewMessage{}
		return json.Unmarshal(data, t.NewMessage)
	case "removeChatNotifs":
		t.RemoveChatNotif = &RemoveChatNotif{}
		return json.Unmarshal(data, t.RemoveChatNotif)

	case "groupChatboxClosed":
		t.GroupChatRead = &GroupChatRead{}
		return json.Unmarshal(data, t.GroupChatRead)
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

			for user, conn := range loggedInSockets {
				if user == f.Notifiyee {
					fmt.Printf("*********************** %v has new notifications ***********************************", user)
					var fn AllNotifs
					fn.SendNotifs = notifications.GetNotifications(s.Db, user)
					fn.Tipo = "allNotifs"
					conn.WriteJSON(fn)
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
			notifications.StoreNotification(s.Db, "privateMessage", recipientIdInt, senderIdInt, 0)
			var nc ChatsToSend
			var nt ChatSocketNotif
			nc.Chats = chats.GetAllMessageHistoryFromChat(s.Db, chats.ChatHistoryValidation(s.Db, senderIdInt, recipientIdInt).ChatID)
			nc.Tipo = "chatHistory"
			nt.Tipo = "socketChatNotif"

			nt.SocketNotifiersArr = notifications.ReturnUserChatNotifications(s.Db, recipientIdInt)
			nt.RecipientID = recipientIdInt
			nt.SenderID = senderIdInt
			nt.SenderName = users.ReturnSingleUser(s.Db, users.GetEmailFromUserID(s.Db, senderIdInt)).Firstname
			fmt.Println("sanity check for sna arr ==> ", nt.SocketNotifiersArr)

			for id, conn := range loggedInSockets {
				if recipientIdInt == id || senderIdInt == id {
					conn.WriteJSON(nc)
				}
			}

			for sid, cx := range loggedInSockets {
				if recipientIdInt == sid {
					cx.WriteJSON(nt)
				}
			}

		}

		if f.Type == "newGroupMessage" {
			// fmt.Println("checking whats in f in group message", f.MessageContent)

			senderIdInt, _ := strconv.Atoi(f.LoggedInUserID)
			groupIdInt, _ := strconv.Atoi(f.NewMessage.GroupID)

			// store group message in the database
			chats.StoreGroupMessage(s.Db, groupIdInt, f.MessageContent, senderIdInt)
			allgroupmembers := groups.GetAllGroupMembers(s.Db, groupIdInt)

			for _, memberID := range allgroupmembers {
				if senderIdInt != memberID {
					notifications.StoreNotification(s.Db, "groupMessage", memberID, senderIdInt, groupIdInt)
				}
			}

			for id, conn := range loggedInSockets {
				// need to check if the id is a member of a group
				var gm GroupMessages
				if id != senderIdInt {
					gm.NewNotif = "true"
					gm.GroupIDs = notifications.GetGroupChatNotifs(s.Db, id)
					fmt.Println("new Messages from this groupID", gm.GroupIDs)
				}

				if groups.GroupMemberCheck(s.Db, groupIdInt, id) {
					gm.GroupM = chats.GetGroupChatHistory(s.Db, groupIdInt)
					gm.Tipo = "newGroupMessage"
					gm.GroupID = groupIdInt
					conn.WriteJSON(gm)
				}
			}

		}

		if f.Type == "groupChatboxClosed" {
			notifications.ReadGroupChatNotif(s.Db, f.GroupChatRead.LoggedInUser, f.GroupChatRead.GroupID)
		}

		if f.Type == "groupNotifs" {

			if !groups.GroupMemberCheck(s.Db, f.Group, f.User) {
				notifications.StoreNotification(s.Db, "groupRequest", groups.GetCreator(s.Db, f.Group), f.User, f.Group)
			} else {
				fmt.Println("Membership not added to the db as already part of group")
			}
			fmt.Println("******************* ws notifs: groupRequest ************************")

			for user, conn := range loggedInSockets {
				if user == groups.GetCreator(s.Db, f.Group) {
					fmt.Printf("*********************** %v has new notifications ***********************************", user)
					var gn AllNotifs
					gn.SendNotifs = notifications.GetNotifications(s.Db, user)
					gn.Tipo = "allNotifs"
					conn.WriteJSON(gn)
				}
			}

		}

		if f.Type == "groupInviteNotifs" {

			for _, obj := range f.Invitees {
				invited, err := strconv.Atoi(obj.Invited)
				if err != nil {
					fmt.Println("Error parsing invited string", err)
				}

				gid, err := strconv.Atoi(obj.GroupID)
				if err != nil {
					fmt.Println("Error parsing invited string", err)
				}

				notifications.StoreNotification(s.Db, "groupInvite", invited, obj.Inviter, gid)
				// fmt.Println("from loop", prettyPrint(obj))

			}

			for i := range f.Invitees {
				for user, conn := range loggedInSockets {
					invited, err := strconv.Atoi(f.Invitees[i].Invited)
					if err != nil {
						fmt.Println("Error parsing invited string", err)
					}
					if user != f.Invitees[0].Inviter && user == invited {
						var in AllNotifs
						in.SendNotifs = notifications.GetNotifications(s.Db, user)
						in.Tipo = "allNotifs"
						conn.WriteJSON(in)
					}
				}
			}

		}
	

		if f.Type == "eventInviteNotifs" {

			eventID := groups.CreateGroupEvent(s.Db, f.GroupEvent.GroupID, f.Creator, f.EventName, f.EventDescription, f.EventStartDate)

			// get all group members then update the notifications table,
			// then create entries within the notication table
			allgroupmembers := groups.GetAllGroupMembers(s.Db, f.GroupEvent.GroupID)
			fmt.Println("all-group-members", allgroupmembers)

			for _, member := range allgroupmembers {
				if member != f.Creator {
					groups.UpdateNotifcationTablePostEventCreation(s.Db, "eventInvite", member, f.Creator, f.GroupEvent.GroupID, eventID)
				} else {
					var g UpdateEvents
					g.Tipo = "groupEvents"
					g.GroupEvents = groups.GetEventInfo(s.Db, f.GroupEvent.GroupID)

					loggedInSockets[member].WriteJSON(g)
				}
			}

			for _, member := range allgroupmembers {
				for user, conn := range loggedInSockets {
					if user != f.Creator && user == member {
						var en AllNotifs
						en.SendNotifs = notifications.GetNotifications(s.Db, user)
						en.Tipo = "allNotifs"
						conn.WriteJSON(en)
					}
				}
			}
		}

		if f.Type == "removeChatNotifs" {
			loggedInIdInt, _ := strconv.Atoi(f.RecID)

			clickedIdInt, _ := strconv.Atoi(f.ClickedID)

			fmt.Printf("LoggedIN = %v & clicked = %v", loggedInIdInt, clickedIdInt)

			//if notifications.CheckIfUserHasNotificationsFromUser(s.Db, loggedInIdInt, clickedIdInt) {
			notifications.ReadChatNotification(s.Db, loggedInIdInt, clickedIdInt)
			//}

			var rcn RemoveChatNotif

			rcn.Msg = "Removed the chat notif when x clicked"
			rcn.Tipo = "removedChatNotif"
			for s, cs := range loggedInSockets {
				if s == loggedInIdInt {
					cs.WriteJSON(rcn)
				}
			}
		}
	}
}
