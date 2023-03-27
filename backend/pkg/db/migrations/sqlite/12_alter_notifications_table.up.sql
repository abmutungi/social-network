ALTER TABLE notifications RENAME TO notifications_old;

CREATE TABLE notifications
(
	notificationID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    notificationType CHAR(50) NOT NULL,
    notifiyee INTEGER REFERENCES users(userID),
    notifier INTEGER REFERENCES users(userID),
    read INTEGER DEFAULT 0 NOT NULL,
    actioned INTEGER DEFAULT 0 NOT NULL,
    createdAt INTEGER DEFAULT 0 NOT NULL, 
    groupID INTEGER DEFAULT 0 NOT NULL,
    eventID INTEGER DEFAULT 0 NOT NULL

);

INSERT INTO notifications (notificationID, notificationType, notifiyee, notifier, read,  actioned, createdAt, groupID)
	SELECT notificationID, notificationType, notifiyee, notifier, read, actioned, createdAt, groupID
	FROM notifications_old;

DROP TABLE notifications_old