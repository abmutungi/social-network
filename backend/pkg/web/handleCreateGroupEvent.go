package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type GroupEvent struct {
	EventName   string `json:"eventName"`
	Description string `json:"eventDescription"`
	Date        string `json:"eventStartDate"`
	UserID      int    `json:"creator"`
	GroupID     int    `json:"GroupID"`
}



func (s *Server) CreateGroupEvent() http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("Error reading body from IsGroupMember", err)
		}

		fmt.Println("data preparsed", data)

		var g GroupEvent

		json.Unmarshal(data, &g)
		

		fmt.Println("GroupEventDetails", g)

	}
}
