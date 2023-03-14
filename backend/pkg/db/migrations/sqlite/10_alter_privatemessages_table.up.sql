ALTER TABLE privateMessages RENAME to privateMessages_old;

CREATE TABLE privateMessages(
    privateMessageID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    privateChatID INTEGER REFERENCES privateChats(privateChatID),
    senderID INTEGER REFERENCES users(userID),
    recipientID INTEGER REFERENCES users(userID),
    messageContent CHAR(250) NOT NULL,
    createdAt INTEGER NOT NULL
);

INSERT INTO privateMessages(privateMessageID, privateChatID,  messageContent, createdAt)
    SELECT privateMessageID, privateChatID, messageContent, createdAt
    FROM privateMessages_old;

DROP TABLE privateMessages_old