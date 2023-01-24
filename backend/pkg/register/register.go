package register

import (
	"database/sql"
	"fmt"
	"net"
	"regexp"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

// final function to store user in DB
func StoreNewUserInDatabase(db *sql.DB, email string, hash []byte, firstName, lastName, dateOfBirth, avatar, nickname, aboutMe string, privacy int) {
	stmt, err := db.Prepare("INSERT INTO users (email, password, firstName, lastName, dateOfBirth, avatar, nickname, aboutMe, privacy,createdAT ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, strftime('%H:%M %d/%m/%Y','now','localtime'))")
	if err != nil {
		fmt.Println("error preparing statement:", err)
		return
	}
	// defer stmt.Close()
	result, _ := stmt.Exec(email, hash, firstName, lastName, dateOfBirth, avatar, nickname, aboutMe, privacy)
	// checking if the result has been added and the last inserted row
	rowsAff, _ := result.RowsAffected()
	lastIns, _ := result.LastInsertId()
	fmt.Println("rows affected:", rowsAff)
	fmt.Println("last inserted:", lastIns)
}

// Need to check email doesn't exist
func CheckEmailExists(db *sql.DB, email string) bool {

	emailCheck := "SELECT userID from users WHERE email = ?"
	rowEmails := db.QueryRow(emailCheck, email)
	var em string
	err := rowEmails.Scan(&em)
	if err != sql.ErrNoRows {
		fmt.Println("Email already exists", err)
		return true
	}
	return false
}

// Need to check email is from a valid domain
func ValidEmailDomainCheck(email string) bool {
	domain := email[strings.Index(email, "@")+1:]
	fmt.Println("Domain: ", domain)
	mx, err := net.LookupMX(domain)
	if err != nil {
		fmt.Println("invalid email")
		return false
	}

	for _, e := range mx {
		fmt.Println("Each e --> ", *e)
	}

	return true
}

// Need to check password is valid
func CheckPasswordValid(password string) bool {

	lowerCaseChecker := regexp.MustCompile(`[a-z]+`)
	upperCaseChecker := regexp.MustCompile(`[A-Z]+`)
	numChecker := regexp.MustCompile(`[\d]`)

	switch {
	case len(password) < 5:
		return false
	case !lowerCaseChecker.MatchString(password):
		return false
	case !upperCaseChecker.MatchString(password):
		return false
	case !numChecker.MatchString(password):
		return false

	}

	return true
}

// Need to encrypt the password
func EncryptPassword(password string) []byte {
	var hashedPassword []byte

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Error when encrypting password --> ", err)
	}

	return hashedPassword
}

//Need to restrict image size if exists

//Store image
