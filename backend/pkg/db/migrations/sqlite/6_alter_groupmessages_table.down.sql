ALTER TABLE groupMessages RENAME TO groupMessages_old;

CREATE TABLE groupMessages
(
	groupMessageID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    groupChatID REFERENCES groups(groupID),
    messageContent CHAR(250) NOT NULL,
    sender REFERENCES users(userID),
    createdAt INTEGER NOT NULL

);

INSERT INTO groupMessages (groupChatID, messageContent, sender, createdAt)
	SELECT groupChatID, messageContent, sender, createdAt
	FROM groupMessages_old;

DROP TABLE groupMessages_old