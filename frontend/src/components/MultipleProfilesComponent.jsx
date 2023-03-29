import SingleProfileComponent from "./SingleProfileComponent";
import { loggedInUserContext } from "../context/loggedInUserContext";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/webSocketContext";
import { LowerHeaderContext } from "../context/lowerheadercontext";

const MultipleProfilesComponent = ({ users, type }) => {
  const { socketChatNotif, lastMsgSender } = useContext(SocketContext);
  const { chatNotifsOnLogin, updateChatNotifsOnLogin } =
    useContext(loggedInUserContext);
  const { LoggedInUserID } = useContext(LowerHeaderContext);

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

  // console.log(
  //   "chatNotifs should be the same as above ===> ",
  //   chatNotifsOnLogin.notifiers
  // );

  if (type === "AllGroups") {
    return users?.map((user, index) => {
      let userPicPath =
        user.Avatar === ""
          ? "../assets/img/ext/creategroupposticonone.png"
          : `../assets/img/ext/${user.Avatar}`;

      return (
        <SingleProfileComponent
          chatName={`${user.GroupName}`}
          id={user.GroupID}
          key={index}
          type={type}
          members={user.Members}
          creator={user.CreatorID}
          avatar={userPicPath}
        />
      );
    });
  }

  if (type === "AllUsers") {
    //omit loggedinuser
    const filteredUsers = users?.filter((user) => user.UserID !== LoggedInUserID);

    return filteredUsers?.map((user, index) => {
      let userPicPath =
        user.Avatar === ""
          ? "../assets/img/ext/userdefaulttwo.png"
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
          ? "../assets/img/ext/userdefaulttwo.png"
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
          socketnotifier={
            socketChatNotif &&
            user.userID == lastMsgSender &&
            loggedInUser !== lastMsgSender
          }
          onClick={() => {
            console.log("chatbox clicked");
          }}
        />
      );
    });
  }

  if (type === "GroupChats") {
    return users?.map((user, index) => {
      let userPicPath =
        user.groupAvatar === ""
          ? "../assets/img/ext/creategroupposticonone.png"
          : `../assets/img/ext/${user.groupAvatar}`;
      return (
        <SingleProfileComponent
          chatName={`${user.groupName}`}
          groupID={user.groupID}
          key={index}
          type={type}
          avatar={userPicPath}
        />
      );
    });
    // console.log("checking group chats data", users);
  }
};

export { MultipleProfilesComponent };
