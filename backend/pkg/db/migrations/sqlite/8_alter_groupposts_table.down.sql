ALTER TABLE groupPosts RENAME TO groupPosts_old;

CREATE TABLE groupPosts(
    groupPostID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    groupID INTEGER REFERENCES groups(groupID),
    userID INTEGER REFERENCES users(userID),
    createdAt INTEGER NOT NULL, 
    textContent CHAR(250),
    imageContent CHAR(50),
    privacy INTEGER NOT NULL
);

INSERT INTO groupPosts (groupPostID, groupID, userID, createdAt, textContent, imageContent, privacy)
	SELECT groupPostID, groupID, userID, createdAt, textContent, imageContent, privacy
	FROM groupPosts_old;

DROP TABLE groupPosts_old