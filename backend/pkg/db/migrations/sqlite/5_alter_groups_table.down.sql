ALTER TABLE groups RENAME TO groups_old;

CREATE TABLE groups
(
	groupID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name CHAR(50) NOT NULL,
    creator CHAR(50) REFERENCES users(userID),
    avatar CHAR(50),
    about TEXT

);

INSERT INTO groups (groupID, name, creator, avatar, about)
	SELECT groupID, name, creator, avatar, about
	FROM groups_old;

DROP TABLE groups_old