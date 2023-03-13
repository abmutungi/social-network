ALTER TABLE groupMembers RENAME TO groupMembers_old;

CREATE TABLE groupMembers
(
	groupID INTEGER REFERENCES groups(groupID),
    member INTEGER REFERENCES users(userID),
    dateJoined INTEGER NOT NULL

);

INSERT INTO groupMembers (groupID, member, dateJoined)
	SELECT groupID, member, dateJoined
	FROM groupMembers_old;

DROP TABLE groupMembers_old