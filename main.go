package main

import (
	"log"

	"github.com/abmutungi/social-network/backend/pkg/db"
)

func main() {
	err := db.RunMigrationScript(db.CreateDB("connect-db.db"))
	if err != nil {
		log.Fatalf("failed to run migrations: %s", err)
	}

	log.Println("succesfully run migrations")
}
