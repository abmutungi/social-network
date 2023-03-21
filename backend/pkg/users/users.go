package users

import (
	"database/sql"
	"fmt"
	"log"
)

type User struct {
	UserID    int
	Email     string
	Password  string
	Firstname string
	Lastname  string
	DOB       string
	Nickname  string
	Avatar    string
	AboutText string
	Privacy   int
	Created   string
	Notifications bool 
	Groups        []int

	// Followers int
	// Following int
}

// type User struct {
// 	ID        int    `json:"UserID"`
// 	Email     string `json:"UserEmail"`
// 	FName     string `json:"UserFName"`
// 	LName     string `json:"UserLName"`
// 	DOB       string `json:"UserDOB"`
// 	Avatar    string `json:"UserAvatar"`
// 	Nickname  string `json:"UserNickname"`
// 	AboutMe   string `json:"UserAboutMe"`
// 	Privacy   string `json:"UserPrivacy"`
// 	CreatedAt string `json:"UserCreatedAt"`
// }

// func ReturnAllUsers(db *sql.DB) []User {
// 	rows, err := db.Query("SELECT userID, email, firstName, lastName, dateOfBirth, avatar, nickname, aboutMe, privacy, createdAT from users")
// 	if err != nil {
// 		fmt.Println("Error in getting all users from database: ", err)
// 	}
// 	var allUsers []User
// 	defer rows.Close()
// 	for rows.Next() {
// 		var u User
// 		err2 := rows.Scan(&u.ID, &u.Email, &u.FName, &u.LName, &u.DOB, &u.Avatar, &u.Nickname, &u.AboutMe, &u.Privacy, &u.CreatedAt)
// 		allUsers = append(allUsers, u)
// 		if err2 != nil {
// 			fmt.Println("Error when looping through rows of users: ", err2)
// 		}
// 	}

// 	return allUsers
// }

func ReturnSingleUser(db *sql.DB, email string) User {
	userStmt := "SELECT  userID, email, firstName, lastName, dateOfBirth, avatar, nickname, aboutMe, privacy, createdAT from users WHERE email=?"
	userRow := db.QueryRow(userStmt, email)

	var a User
	err := userRow.Scan(&a.UserID, &a.Email, &a.Firstname, &a.Lastname, &a.DOB, &a.Avatar, &a.Nickname, &a.AboutText, &a.Privacy, &a.Created)
	if err != nil {
		fmt.Printf("Error in getting this users (%s) data: %v\n", email, err)
	}
	return a
}

func GetEmailFromUserID(db *sql.DB, id int) string {
	userStmt := "SELECT email from users WHERE userID = ?"
	userRow := db.QueryRow(userStmt, id)
	var e string
	err := userRow.Scan(&e)
	if err != nil {
		fmt.Printf("Error in getting the email for this userID(%d): %v", id, err)
	}
	return e
}

// checking if user follows loggedInUser
func GetAllUserData(db *sql.DB) []User {
	rows, err := db.Query(`SELECT * FROM users ;`)
	if err != nil {
		log.Println("Error from GetAllUserData fn():", err)
		return nil
	}
	defer rows.Close()

	var AllUsers []User
	for rows.Next() {
		var a User
		err := rows.Scan(&a.UserID, &a.Email, &a.Password, &a.Firstname, &a.Lastname, &a.DOB, &a.Avatar, &a.Nickname, &a.AboutText, &a.Privacy, &a.Created)
		if err != nil {
			log.Println("Error scanning rows:", err)
			continue
		}
		a.Groups = append(a.Groups, GetAUsersGroups(db, a.UserID)...)

		AllUsers = append(AllUsers, a)
	}

	return AllUsers
}

func GetAUsersGroups(db *sql.DB, userid int) []int {
	rows, err := db.Query(`SELECT groupID FROM groupMembers WHERE member = ?`, userid)
	if err != nil {
		log.Println("Error from GetAUsersGroups fn():", err)
		return nil
	}
	defer rows.Close()

	var Groups []int
	for rows.Next() {
		var a int
		err := rows.Scan(&a)
		if err != nil {
			log.Println("Error scanning group rows within GetAUsersGroups fn():", err)
			continue

		}
		Groups = append(Groups, a)
	}

	return Groups

}

// update users set privacy = 1 where userID = 1;
func UpdatePrivacy(db *sql.DB, privacy, userID int) {
	res, err := db.Exec(`UPDATE users SET privacy = ? WHERE userID = ?`, privacy, userID)
	if err != nil {
		panic(err)
	}

	rowsAff, _ := res.RowsAffected()
	LastIns, _ := res.LastInsertId()
	fmt.Println("rows affected:", rowsAff)
	fmt.Println("last inserted:", LastIns)
}
