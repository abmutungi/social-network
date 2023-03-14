package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/abmutungi/social-network/backend/pkg/chats"
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
