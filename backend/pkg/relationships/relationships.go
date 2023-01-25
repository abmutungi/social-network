package relationships

import (
	"database/sql"
	"fmt"
	"log"
)

func StoreFollowing(db *sql.DB, loggedInUser, userID int) {
	stmt, err := db.Prepare("INSERT INTO relationships (followerID, userID) VALUES (?, ?)")
	if err != nil {
		fmt.Println("error adding relationship into db")
		return
	}

	result, _ := stmt.Exec(loggedInUser, userID)
	rowsAff, _ := result.RowsAffected()
	LastIns, _ := result.LastInsertId()
	fmt.Println("rows affected:", rowsAff)
	fmt.Println("last inserted:", LastIns)
}

// checking if user follows loggedInUser
func FollowingMeCheck(db *sql.DB, userID, followerID int) bool {
	rows, err := db.Query(`SELECT userID, followerID FROM relationships WHERE userID = ? AND followerID = ?;`, userID, followerID)
	if err != nil {
		fmt.Println("Error from FollowingMeCheck fn()", err)
	}
	var user int
	var follower int
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&user, &follower)
		if err != sql.ErrNoRows {
			log.Println("User already follows me")
			return true
		}
	}
	log.Println("User is not following me")
	return false
}

// checking if loggedInUser follows user
func FollowingYouCheck(db *sql.DB, userID, followerID int) bool {
	rows, err := db.Query(`SELECT userID, followerID FROM relationships WHERE userID = ? AND followerID = ?;`, followerID, userID)
	if err != nil {
		fmt.Println("Error from FollowingYouCheck fn()", err)
	}

	var user int
	var follower int
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&user, &follower)
		if err != sql.ErrNoRows {
			log.Println("I already follow this user")
			return true
		}
	}
	log.Println("I'm not following this user")
	return false
}

func UnfollowUser(db *sql.DB, loggedInUser, userID int) {
	res, err := db.Exec(`DELETE FROM relationships WHERE followerID = ? AND userID = ?;`, loggedInUser, userID)
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