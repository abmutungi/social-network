# Social Network

A comprehensive Facebook-like social network with a frontend and backend, incorporating authentication, real-time communication, and robust data management.

## Features

### Followers

-   Users can follow/unfollow others.
-   Follow requests need approval unless the profile is public.

### Profile

-   Contains user information, activity, posts, followers, and following.
-   Users can toggle their profile between public and private.

### Posts

-   Users can create posts with images or GIFs.
-   Posts can have privacy settings: public, private, almost private.
-   Users can comment on posts.

### Groups

-   Users can create and join groups.
-   Group members can create posts, comment, and create events.
-   Events have title, description, date/time, and participation options.

### Notifications

-   Users receive notifications for follow requests, group invitations, and group events.
-   Notifications are distinct from private messages.

### Chats

-   Private messaging between users.
-   Group chat for group members.
-   Messages delivered in real-time via WebSockets.
-   Support for sending emojis.

## Usage

1. In the backend directory run the server ``` go run main.go ```
2. In the frontend directory run the following commands
		```npm i```
		```npm run dev``` 
		(ensure both backend and frontend are running at the same time)


## Implementation
This app was built using:

- Golang on the backend to handle requests and connect to SQLite database
- React, Context API on the frontend