ALTER TABLE privateMessages RENAME TO privateMessages_old;

CREATE TABLE privateMessages(
    privateMessageID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    privateChatID INTEGER REFERENCES privateChats(privateChatID),
    userID INTEGER REFERENCES users(userID),
    messageContent CHAR(250) NOT NULL,
    createdAt INTEGER NOT NULL
);

INSERT INTO privateMessages (privateMessageID, privateChatID, userID, messageContent, createdAt)
SELECT privateMessageID, privateChatID, userID, messageContent, createdAt
FROM privateMessages_old;


DROP TABLE privateMessages_old