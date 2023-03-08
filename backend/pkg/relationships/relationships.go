package relationships

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/abmutungi/social-network/backend/pkg/users"
)

func StoreFollowing(db *sql.DB, userID, loggedInUser int) {
	stmt, err := db.Prepare("INSERT INTO relationships (userID, followerID) VALUES (?, ?)")
	if err != nil {
		fmt.Println("error adding relationship into db")
		return
	}

	result, _ := stmt.Exec(userID, loggedInUser)
	rowsAff, _ := result.RowsAffected()
	LastIns, _ := result.LastInsertId()
	fmt.Println("rows affected:", rowsAff)
	fmt.Println("last inserted:", LastIns)
}

// checking if user follows loggedInUser
func FollowingMeCheck(db *sql.DB, loggedInUser, userID int) bool {
	var count int
	err := db.QueryRow(`SELECT  COUNT(*)  FROM relationships WHERE userID = ? AND followerID = ?;`, loggedInUser, userID).Scan(&count)
	if err != nil {
		log.Println("Error from FollowingMeCheck fn():", err)
		return false
	}
	if count > 0 {
		//fmt.Println("User already follows me")
		return true
	}
	//fmt.Println("User is not following me")
	return false
}

// checking if loggedInUser follows user
func FollowingYouCheck(db *sql.DB, userID, loggedInUser int) bool {
	var count int
	err := db.QueryRow(`SELECT  COUNT(*)  FROM relationships WHERE userID = ? AND followerID = ?;`, userID, loggedInUser).Scan(&count)
	if err != nil {
		log.Println("Error from FollowingYouCheck fn():", err)
		return false
	}
	if count > 0 {
	//	fmt.Println("I already follow this user")
		return true
	}
	//fmt.Println("I'm not following this user")
	return false
}

func UnfollowUser(db *sql.DB, userID, loggedInUser int) {
	res, err := db.Exec(`DELETE FROM relationships WHERE userID = ? AND followerID = ?;`, userID, loggedInUser)
	if err != nil {
		panic(err)
	}
	count, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	fmt.Println(count)
	fmt.Println("UNFOLLOWED USER")
}

func FollowRequestCheck(db *sql.DB, loggedInUser, userID int) bool {
	var count int
	err := db.QueryRow(`SELECT COUNT(*) FROM notifications WHERE notifiyee = ? AND notifier = ? AND notificationType = 'followRequest';`, userID, loggedInUser).Scan(&count)
	if err != nil {
		log.Println("Error from FollowRequestCheck fn():", err)
		return false
	}
	if count > 0 {
	//	fmt.Println("I've sent this user a follow request, pending response")
		return true
	}
	//fmt.Println("I'm not awaiting response from follow request, I can send a request")
	return false
}

// function to get all followers of passed in user.

func GetAllFollowers(db *sql.DB, userID int) []users.User {
	rows, err := db.Query(`SELECT users.userID, firstName 
	FROM users 
	INNER JOIN relationships ON relationships.followerID = users.userID 
	WHERE relationships.userID = ?`, userID)

	if err != nil {
		fmt.Printf("error querying GetAllFollowers statement: %v ", err)
	}

	var followers []users.User

	defer rows.Close()

	for rows.Next() {
		var f users.User
		err2 := rows.Scan(&f.UserID, &f.Firstname)
		if err2 != nil {
			fmt.Printf("error scanning rows for followers: %v,", err2)
		}
		followers = append(followers, f)

	}
	return followers
}
