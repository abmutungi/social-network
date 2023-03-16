package web

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var loggedInSockets = make(map[int]*websocket.Conn)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (s *Server) UpgradeConnection(w http.ResponseWriter, r *http.Request) {
	wsConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("error upgrading connection: %v", err)
	}

    defer wsConn.Close()

    loggedInSockets 
}   
