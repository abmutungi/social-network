import SingleProfileComponent from "./SingleProfileComponent";
import { loggedInUserContext } from "../context/loggedInUserContext";
import { useContext, useEffect } from "react";

const MultipleProfilesComponent = ({ users, type }) => {
  const { chatNotifsOnLogin, updateChatNotifsOnLogin } =
    useContext(loggedInUserContext);
  // fetch chat history on chat user click
  const fetchChatNotificationsForm = new FormData();
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")).ID;
  fetchChatNotificationsForm.append("loggedInID", loggedInUser);

  async function fetchChatNotificationOnLogin() {
    const resp = await fetch("http://localhost:8080/chatnotificationsonlogin", {
      method: "POST",
      credentials: "include",
      body: fetchChatNotificationsForm,
    });
    const data = await resp.json();
    console.log("messages data", data);
    updateChatNotifsOnLogin(data);

    //function to check if name provided is in notifications
  }
  const checkUserForChatNotification = (notifier) => {
    if (
      chatNotifsOnLogin.notifiers !== null &&
      chatNotifsOnLogin.notifiers !== undefined
    ) {
      return chatNotifsOnLogin.notifiers.includes(notifier);
    } else {
      return false;
    }
  };

  // checkUserForChatNotification(chatNotifsOnLogin);

  useEffect(() => {
    fetchChatNotificationOnLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(
    "chatNotifs should be the same as above ===> ",
    chatNotifsOnLogin.notifiers
  );

  if (type === "AllGroups") {
    return users?.map((user, index) => {
      return (
        <SingleProfileComponent
          chatName={`${user.GroupName}`}
          id={user.GroupID}
          key={index}
          type={type}
          members={user.Members}
          creator={users.CreatorID}
        />
      );
    });
  }

  if (type === "AllUsers") {
    return users?.map((user, index) => {
      let userPicPath =
        user.Avatar === ""
          ? "../assets/img/ext/man-utd.png"
          : `../assets/img/ext/${user.Avatar}`;

      return (
        <SingleProfileComponent
          chatName={`${user.Firstname}`}
          id={user.UserID}
          key={index}
          type={type}
          avatar={userPicPath}
        />
      );
    });
  }

  if (type === "Chats") {
    return users?.map((user, index) => {
      let userPicPath =
        user.avatar === ""
          ? "../assets/img/ext/man-utd.png"
          : `../assets/img/ext/${user.avatar}`;
      return (
        <SingleProfileComponent
          chatName={`${user.FName}`}
          id={user.userID}
          key={index}
          type={type}
          avatar={userPicPath}
          notifier={
            checkUserForChatNotification(user.FName) && chatNotifsOnLogin
          }
          onClick={() => {
            console.log("chatbox clicked");
          }}
        />
      );
    });
  }
};

export { MultipleProfilesComponent };
