package web

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/chats"
	"github.com/abmutungi/social-network/backend/pkg/notifications"
)

func (s *Server) HandleMyChatUsers() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing userID form: %v", err)
		}

		userIdInt, _ := strconv.Atoi((r.Form.Get("loggedInUserID")))

		var chatsToSend []chats.PotentialChats = chats.GetChatUsers(s.Db, userIdInt)
		// fmt.Println(postsToSend)
		marshalChats, _ := json.Marshal(chatsToSend)

		w.Header().Set("Content-Type", "application/json")
		w.Write(marshalChats)

	}
}

func (s *Server) SendChatHistory() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		s.Db, _ = sql.Open("sqlite3", "connect-db.db")

		err := r.ParseMultipartForm(10 << 20)

		if err != nil {
			fmt.Printf("error parsing userID form: %v", err)
		}

		senderIdInt, _ := strconv.Atoi((r.Form.Get("senderID")))
		recipientIdInt, _ := strconv.Atoi(r.Form.Get("recipientID"))

		//sender is logged in user
		if notifications.CheckIfUserHasNotificationsFromUser(s.Db, senderIdInt, recipientIdInt) {
			notifications.ReadChatNotification(s.Db, senderIdInt, recipientIdInt)
		}

		chatHistoryToSend, _ := json.Marshal(chats.GetAllMessageHistoryFromChat(s.Db, chats.ChatHistoryValidation(s.Db, senderIdInt, recipientIdInt).ChatID))
		w.Write(chatHistoryToSend)
		fmt.Println("senderID -> ", senderIdInt)
		fmt.Println("rec id -> ", recipientIdInt)
		// fmt.Println("msg -> ", msgContent)

	}
}

//function to get group chats would consist of just getting all groups logged in member is a part of
