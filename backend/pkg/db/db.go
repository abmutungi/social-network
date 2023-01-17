package db

import (
	"database/sql"
	"fmt"

	"github.com/golang-migrate/migrate"
	"github.com/golang-migrate/migrate/database/sqlite3"
	_ "github.com/golang-migrate/migrate/source/file"
	_ "github.com/mattn/go-sqlite3"
)

func CreateDB(dbName string) *sql.DB {
	db, err := sql.Open("sqlite3", dbName)
	if err != nil {
		fmt.Printf("error creating database: %v", err)
		return nil
	}
	return db
}

func RunMigrationScript(db *sql.DB) error {
	driver, err := sqlite3.WithInstance(db, &sqlite3.Config{})
	if err != nil {
		return fmt.Errorf("error creating sqlite db driver %s", err)
	}

	migration, err := migrate.NewWithDatabaseInstance("file://pkg/db/migrations/sqlite", "sqlite3", driver)
	if err != nil {
		return fmt.Errorf("initialising db migration failed %s", err)
	}

	err = migration.Up()

	if err != nil && err != migrate.ErrNoChange {
		return fmt.Errorf("migrating db failed %s", err)
	}

	return nil
}
