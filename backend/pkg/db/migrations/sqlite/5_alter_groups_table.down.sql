ALTER TABLE groups RENAME TO groups_old;

CREATE TABLE groups
(
	groupID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name CHAR(50) NOT NULL,
    creator CHAR(50) REFERENCES users(userID),
    avatar CHAR(50),
    about TEXT
    createdAt INTEGER NOT NULL

);

INSERT INTO groups (groupID, name, creator, avatar, about, createdAt)
	SELECT groupID, name, creator, avatar, about, createdAt
	FROM groups_old;

DROP TABLE groups_old