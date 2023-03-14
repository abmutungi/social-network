package chats

import (
	"database/sql"
	"fmt"

	"github.com/abmutungi/social-network/backend/pkg/relationships"
)

type PotentialChats struct {
	UserID  int    `json:"userID"`
	FName   string `json:"FName"`
	LName   string `json:"LName"`
	Avatar  string `json:"avatar"`
	Privacy int    `json:"privacy"`
}

// send all public users and users you are following for chat section

func GetChatUsers(db *sql.DB, userID int) []PotentialChats {
	rows, err := db.Query(`SELECT firstName, lastName, avatar, userID, privacy
	FROM users`)

	if err != nil {
		fmt.Printf("error with getChatUsers function: %v", err)
	}

	defer rows.Close()

	var chats []PotentialChats

	for rows.Next() {
		var pc PotentialChats

		err := rows.Scan(&pc.FName, &pc.LName, &pc.Avatar, &pc.UserID, &pc.Privacy)

		if err != nil {
			fmt.Printf("error with potentialChats scan: %v", err)
		}

		fmt.Println("LoggeduserID", userID, "pcUserId", pc.UserID)
		if pc.Privacy == 0 && pc.UserID != userID || relationships.FollowingYouCheck(db, pc.UserID, userID) {
			chats = append(chats, pc)
		}
	}

	return chats
}
