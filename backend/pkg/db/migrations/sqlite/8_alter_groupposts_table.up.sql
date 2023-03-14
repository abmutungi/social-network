ALTER TABLE groupPosts RENAME TO groupPosts_old;

CREATE TABLE groupPosts
(
    groupPostID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    groupID INTEGER REFERENCES groups(groupID),
    userID INTEGER REFERENCES users(userID),
    createdAt INTEGER NOT NULL, 
    textContent CHAR(250),
    imageContent CHAR(50)
);

INSERT INTO groupPosts (groupPostID, groupID, userID, createdAt, textContent, imageContent)
	SELECT groupPostID, groupID, userID, createdAt, textContent, imageContent
	FROM groupPosts_old;

DROP TABLE groupPosts_old