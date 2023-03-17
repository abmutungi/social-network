package web

import (
	"fmt"
	"log"
	"net/http"

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

	for {
		message, info, _ := wsConn.ReadMessage()
		fmt.Println("----===> ", string(info))
		fmt.Println("----", message)

		if message == -1 {
			fmt.Println("connection closed")
			return
		}
	}
}
