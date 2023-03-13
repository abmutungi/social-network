ALTER TABLE events RENAME TO events_old;

CREATE TABLE events(
    eventID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    groupID INTEGER REFERENCES groups(groupID),
    creator INTEGER REFERENCES users(userID),
    eventTitle CHAR(50) NOT NULL,
    description CHAR(250),
    dateStart INTEGER NOT NULL,
    attending INTEGER DEFAULT 0 NOT NULL
);


INSERT INTO events (eventID, groupID, creator, eventTitle, description, dateStart, attending)
	SELECT eventID, groupID, creator, eventTitle, description, dateStart, attending
	FROM events_old;

DROP TABLE events_old