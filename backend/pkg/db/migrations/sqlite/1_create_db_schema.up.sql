CREATE TABLE users (
    userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    email CHAR(50) NOT NULL,
    password CHAR(50) NOT NULL,
    firstName CHAR(50) NOT NULL,
    lastName CHAR(50) NOT NULL,
    dateOfBirth INTEGER NOT NULL,
    avatar CHAR(50),
    nickname CHAR(50),
    aboutMe TEXT,
    privacy INTEGER DEFAULT 0 NOT NULL,
    createdAT INTEGER NOT NULL
);

CREATE TABLE relationships(
    userID INTEGER REFERENCES users(userID),
    followerID INTEGER REFERENCES users(userID)
);


CREATE TABLE groups(
    groupID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name CHAR(50) NOT NULL,
    creator CHAR(50) REFERENCES users(userID),
    avatar CHAR(50),
    about TEXT
    createdAt INTEGER NOT NULL
);

CREATE TABLE groupMembers(
    groupID REFERENCES groups(groupID),
    member REFERENCES users(userID),
    dateJoined INTEGER NOT NULL
);

CREATE TABLE groupMessages(
    groupMessageID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    groupChatID REFERENCES groups(groupID),
    messageContent CHAR(250) NOT NULL,
    sender REFERENCES users(userID),
    createdAt INTEGER NOT NULL
);

CREATE TABLE wallPosts(
    wallPostID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    userID INTEGER REFERENCES users(userID),
    createdAt INTEGER NOT NULL, 
    textContent CHAR(250),
    imagePath CHAR(50),
    privacy CHAR NOT NULL
);

CREATE TABLE groupPosts(
    groupPostID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    groupID INTEGER REFERENCES groups(groupID),
    userID INTEGER REFERENCES users(userID),
    createdAt INTEGER NOT NULL, 
    textContent CHAR(250),
    imageContent CHAR(50),
    privacy INTEGER NOT NULL
);

CREATE TABLE postAudience(
    postID INTEGER REFERENCES wallPosts(wallPostID),
    userID INTEGER REFERENCES users(userID)
);

CREATE TABLE comments(
    commentID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    postID INTEGER REFERENCES posts(postID),
    userID INTEGER REFERENCES users(userID),
    createdAt INTEGER NOT NULL,
    textContent CHAR(250),
    imageContent CHAR(50)
);

CREATE TABLE privateChats(
    privateChatID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user1 INTEGER REFERENCES users(userID),
    user2 INTEGER REFERENCES users(userID)
);

CREATE TABLE privateMessages(
    privateMessageID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    privateChatID INTEGER REFERENCES privateChats(privateChatID),
    userID INTEGER REFERENCES users(userID),
    messageContent CHAR(250) NOT NULL,
    createdAt INTEGER NOT NULL
);

CREATE TABLE events(
    eventID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    groupID INTEGER REFERENCES groups(groupID),
    creator INTEGER REFERENCES users(userID),
    eventTitle CHAR(50) NOT NULL,
    description CHAR(250),
    dateStart INTEGER NOT NULL,
    dateFinish INTEGER NOT NULL,
    attending INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE invitees(
    invitee INTEGER REFERENCES users(userID),
    eventID INTEGER REFERENCES events(eventID),
    willAttend INTEGER NOT NULL
);

CREATE TABLE notifications(
    notificationID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    type CHAR(50) NOT NULL,
    notifyee INTEGER REFERENCES users(userID),
    notifier INTEGER REFERENCES users(userID),
    read INTEGER DEFAULT 0 NOT NULL,
    actioned INTEGER DEFAULT 0 NOT NULL

);