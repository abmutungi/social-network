package web

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/chats"
	"github.com/abmutungi/social-network/backend/pkg/notifications"
	"github.com/gorilla/websocket"
)

var (
	loggedInSockets = make(map[int]*websocket.Conn)
	//broadcastChannelChats  = make(chan chats.Chat, 1)
	// broadcastChannelGroupNotifs = make(chan notifications.Notification, 1)
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
	// *chats.Chat
	*NewMessage
}

type TypeChecker struct {
	Type string `json:"type"`
}

// struct for new message

type NewMessage struct {
	LoggedInUserID int    `json:"loggedInUser"`
	RecipientID    int    `json:"recipientID"`
	Tipo           string `json:"tipo"`
}

func (t *T) UnmarshalData(data []byte) error {
	if err := json.Unmarshal(data, &t.TypeChecker); err != nil {
		log.Println("Error receiving data type")
	}

	switch t.Type {
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

		if message == -1 {
			fmt.Println("connection closed")
			return
		}

		f.UnmarshalData(info)

		// for single chat messages

		if f.Type == "newMessage" {

			fmt.Println("New Message has been sent")
			// check if recipeint is in the socket map
			f.NewMessage.Tipo = "newMessage"

			// add fields in struct for message content etc.
			// chats.StorePrivateMessages(s.Db, chats.ChatHistoryValidation(s.Db, f.LoggedInUserID, f.RecipientID).ChatID, msgContent, senderIdInt, recipientIdInt)

			for id, conn := range loggedInSockets {
				if f.RecipientID == id {

					// conn.WriteJSON(chatHistoryToSend)
					conn.WriteJSON(chats.GetAllMessageHistoryFromChat(s.Db, chats.ChatHistoryValidation(s.Db, f.LoggedInUserID, f.RecipientID).ChatID))

					// conn.WriteJSON("new message for recipient")
				}
			}

			// if they are send back all messages between the pair

		}
	}
}
