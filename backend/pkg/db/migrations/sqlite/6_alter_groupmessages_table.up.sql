ALTER TABLE groupMessages RENAME TO groupMessages_old;

CREATE TABLE groupMessages
(
	groupMessageID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    groupChatID INTEGER REFERENCES groups(groupID),
    messageContent CHAR(250) NOT NULL,
    sender INTEGER REFERENCES users(userID),
    createdAt INTEGER NOT NULL

);

INSERT INTO groupMessages (groupMessageID, groupChatID, messageContent, sender, createdAt)
	SELECT groupMessageID, groupChatID, messageContent, sender, createdAt
	FROM groupMessages_old;

DROP TABLE groupMessages_old