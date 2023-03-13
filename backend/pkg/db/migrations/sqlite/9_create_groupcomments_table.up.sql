CREATE TABLE groupComments(
    commentID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    postID INTEGER REFERENCES groupPosts(groupPostID),
    userID INTEGER REFERENCES users(userID),
    createdAt INTEGER NOT NULL,
    textContent CHAR(250),
    imageContent CHAR(50)
);
