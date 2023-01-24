package login

import (
	"database/sql"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

// check email exists
func EmailExists(db *sql.DB, email string) bool {
	userStmt := "SELECT userID FROM users WHERE email = ?"
	userRow := db.QueryRow(userStmt, email)
	var uIDs string
	error := userRow.Scan(&uIDs)
	if error != sql.ErrNoRows {
		fmt.Println("email already exists, err:", error)
		return true
	}
	return false
}

// check password is correct if email exists
func CorrectPassword(db *sql.DB, email, password string) bool {
	// get user from db
	userStmt := "SELECT password from users WHERE email = ?"
	userRow := db.QueryRow(userStmt, email)
	var hash string
	err := userRow.Scan(&hash)
	if err != nil {
		fmt.Println("Error in finding hashed password:  ", err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	return err == nil
}

// Function to return the users ID
func GetUserID(db *sql.DB, email string) int {
	//get userID from db
	userStmt := "SELECT userID from users WHERE email=?"
	userRow := db.QueryRow(userStmt, email)
	var userID int
	err := userRow.Scan(&userID)
	if err != nil {
		fmt.Println("Error in finding this user's id: ", err)
	}
	return userID
}

// Function to return users FName & LName
func GetUserFullName(db *sql.DB, email string) []string {
	var userFullName []string
	userStmt := "SELECT firstName from users WHERE email=?"
	userRow := db.QueryRow(userStmt, email)
	var userFName string
	err := userRow.Scan(&userFName)
	if err != nil {
		fmt.Println("Error in finding this user's first name: ", err)
	}

	userStmtLname := "SELECT lastName from users WHERE email=?"
	userRowLName := db.QueryRow(userStmtLname, email)
	var userLName string
	err2 := userRowLName.Scan(&userLName)
	if err2 != nil {
		fmt.Println("Error in finding this user's last name: ", err)
	}
	userFullName = append(userFullName, userFName)
	userFullName = append(userFullName, userLName)

	return userFullName
}
