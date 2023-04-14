package main

import (
	"log"

	"github.com/abmutungi/social-network/backend/pkg/db"
	"github.com/abmutungi/social-network/backend/pkg/web"
)

func main() {

	dataBase := db.CreateDB("connect-db.db")
	err := db.RunMigrationScript(dataBase)
	if err != nil {
		log.Fatalf("failed to run migrations: %s", err)
	}

	log.Println("succesfully run migrations")

	// for key, value := range web.AllUsers {

	// 	fmt.Println(key, value)
	// }

	var s web.Server

	s.OpenServer(dataBase)

	//s.TestDBfunctions()

}
