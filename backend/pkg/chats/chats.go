package chats

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/abmutungi/social-network/backend/pkg/relationships"
)

type PotentialChats struct {
	UserID  int    `json:"userID"`
	FName   string `json:"FName"`
	LName   string `json:"LName"`
	Avatar  string `json:"avatar"`
	Privacy int    `json:"privacy"`
}

type ChatExistsCheck struct {
	ChatID int
	Exists bool
}

type Chat struct {
	ChatSender    int    `json:"chatsender"`
	ChatRecipient int    `json:"chatrecipient"`
	ChatMessage   string `json:"message"`
	MessageID     int    `json:"messageID"`
	Date          string `json:"chatDate"`
	SenderName    string `json:"senderName"`
}

type GroupChat struct {
	GroupID   int    `json:"groupID"`
	GroupName string `json:"groupName"`
	Avatar    string `json:"groupAvatar"`
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

		//	fmt.Println("LoggeduserID", userID, "pcUserId", pc.UserID)
		// pc.Privacy == 0 && pc.UserID != userID ||
		if relationships.FollowingYouCheck(db, pc.UserID, userID) {
			chats = append(chats, pc)
		}
	}

	return chats
}

func ChatHistoryValidation(db *sql.DB, user1 int, user2 int) ChatExistsCheck {
	rows, err := db.Query(`SELECT user1, user2, privateChatID FROM privateChats WHERE user1 = ? AND user2 =? OR user2 = ? AND user1 = ?;`, user1, user2, user1, user2)
	if err != nil {
		fmt.Println("Error from ChatHistoryV fn()", err)
	}
	// SELECT user1, user2 FROM chats WHERE user1 = "sancho" AND user2 = "royal" OR user1 = "royal" AND user2 = "sancho"
	var userone int
	var usertwo int
	var chatID int
	var chatExists ChatExistsCheck
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&userone, &usertwo, &chatID)
		if err != sql.ErrNoRows {
			log.Println("With ChatHisVal fn()", err)
			log.Println("Users do have a chat")
			log.Println("chatID", chatID)
			chatExists.ChatID = chatID
			chatExists.Exists = true
			return chatExists
		}
	}
	log.Println("Users don't have a chat")
	chatExists.ChatID = 0
	chatExists.Exists = false
	return chatExists
}

// creates a chat entryy between two users on successful validation
func StoreChat(db *sql.DB, chatsender int, chatrecipient int) {
	stmt, err := db.Prepare("INSERT INTO privateChats (user1, user2) VALUES (?, ?)")
	if err != nil {
		fmt.Println("error adding chat to DB")
		return
	}
	result, _ := stmt.Exec(chatsender, chatrecipient)
	rowsAff, _ := result.RowsAffected()
	LastIns, _ := result.LastInsertId()
	fmt.Println("chat rows affected: ", rowsAff)
	fmt.Println("chat last inserted: ", LastIns)
}

func StorePrivateMessages(db *sql.DB, chatID int, message string, chatSender, chatRecipient int) {
	stmt, err := db.Prepare(`INSERT INTO privateMessages (privateChatID, senderID, recipientID,messageContent ,createdAt ) VALUES (?,?,?,?,strftime('%H:%M %d/%m/%Y','now', 'localtime') )`)
	if err != nil {
		fmt.Println("error adding message to DB", err)
		return
	}
	result, _ := stmt.Exec(chatID, chatSender, chatRecipient, message)
	rowsAff, _ := result.RowsAffected()
	LastIns, _ := result.LastInsertId()
	fmt.Println("chat rows affected: ", rowsAff)
	fmt.Println("chat last inserted: ", LastIns)
}

// Function that returns chats based on a chat id.
func GetAllMessageHistoryFromChat(db *sql.DB, chatID int) []Chat {
	rows, err := db.Query(`SELECT privateMessageID,senderID, recipientID, messageContent, createdAt FROM privateMessages WHERE privateChatID = ?;`, chatID)
	if err != nil {
		fmt.Println(err)
	}
	messagedata := []Chat{}

	defer rows.Close()
	for rows.Next() {
		var m Chat
		err2 := rows.Scan(&m.MessageID, &m.ChatSender, &m.ChatRecipient, &m.ChatMessage, &m.Date)
		// m.Tipo = "messagehistoryfromgo"
		m.SenderName = getNameFromUserID(db, m.ChatSender)
		messagedata = append(messagedata, m)
		if err2 != nil {
			fmt.Println(err2)
		}
	}

	return messagedata
}

func getNameFromUserID(db *sql.DB, id int) string {
	stmt := db.QueryRow(`SELECT firstName FROM users WHERE userID = ?`, id)

	var firstName string

	stmt.Scan(&firstName)

	return firstName
}

func GetGroupChats(db *sql.DB, userID int) []GroupChat {
	rows, err := db.Query(`SELECT groups.groupID, name, groups.avatar 
	FROM groupMembers
	INNER JOIN groups ON groups.groupID = groupMembers.groupID   
	WHERE groupMembers.member = ?;`, userID)

	if err != nil {
		fmt.Printf("Error from GetGroupChats: %v", err)
	}

	defer rows.Close()

	var gc []GroupChat

	for rows.Next() {
		var g GroupChat

		err := rows.Scan(&g.GroupID, &g.GroupName, &g.Avatar)

		if err != nil {
			fmt.Printf("Error scanning rows in GetGroupChats: %v", err)
		}

		gc = append(gc, g)
	}

	return gc
}

func GetGroupChatHistory(db *sql.DB, groupID int) []Chat {
	rows, err := db.Query(`SELECT groupmessageID, messageContent, sender, createdAt FROM groupMessages WHERE groupChatID = ?`, groupID)

	if err != nil {
		fmt.Printf("error with getGroupChatHistory query: %v", err)
	}

	defer rows.Close()

	var gm []Chat

	for rows.Next() {
		var m Chat

		err := rows.Scan(&m.MessageID, &m.ChatMessage, &m.ChatSender, &m.Date)

		if err != nil {
			fmt.Printf("error with scanning rows in getGroupChatHistory: %v", err)
		}

		m.SenderName = getNameFromUserID(db, m.ChatSender)
		gm = append(gm, m)
	}
	return gm
}

func StoreGroupMessage(db *sql.DB, groupID int, messageContent string, senderID int) {
	stmt, err := db.Prepare(`INSERT INTO groupMessages (groupChatID, messageContent, sender, createdAt) VALUES (?,?,?, strftime('%H:%M %d/%m/%Y','now', 'localtime'))`)

	if err != nil {
		fmt.Printf("Error with StoreGroupMessage prepare statement :%v", err)
	}

	result, _ := stmt.Exec(groupID, messageContent, senderID)

	rowsAff, _ := result.RowsAffected()
	LastIns, _ := result.LastInsertId()
	fmt.Println("StoreGroupMessage rows affected: ", rowsAff)
	fmt.Println("StoreGroupMessage last inserted: ", LastIns)

}
