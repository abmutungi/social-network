import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

import "../assets/css/AllChats.css";
import "../assets/css/Users.css";
import { LowerHeaderContext } from "../context/lowerheadercontext";
import { useContext, useEffect, useState } from "react";
import { followText, unfollowText, requestText } from "./UserRequestBtn";
import { useNavigate } from "react-router-dom";
import { ChatBox } from "../pages/home/components/ChatBoxComponent";
import { loggedInUserContext } from "../context/loggedInUserContext";
import { SocketContext } from "../context/webSocketContext";

const SingleProfileComponent = (props) => {
  const {
    updateUserID,
    updateGroupID,
    updateFollowing,
    LoggedInUserID,
    userID,
    GroupID,
    updateRequested,
    updateFollowText,
    updateDynamicID,
    updateisGroupMember,
    updateGroupRequested,
    updateNavClicked,
  } = useContext(LowerHeaderContext);

  const {
    updateLastClickedUser,
    lastClickedUser,
    groupMessages,
    updateGroupMessages,
    messages,
    updateChatMessages,
    socketChatNotif,
  } = useContext(SocketContext);
  const { chatNotifsOnLogin, updateChatNotifsOnLogin } =
    useContext(loggedInUserContext);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const [groupClicked, setGroupClicked] = useState(false);
  const navigate = useNavigate();
  // const handleClick = () => {
  async function FetchRelationship() {
    try {
      const response = await fetch("http://localhost:8080/followCheck", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          loggedInUserID: LoggedInUserID,
          userID: userID,
        }),
      });
      const data = await response.json();

      if (data.canFollow) {
        updateFollowing(false);
        updateFollowText(followText);
      } else if (data.following) {
        updateFollowing(true);
        updateFollowText(unfollowText);
      } else if (data.requested) {
        updateRequested(true);
        updateFollowText(requestText);
      }

      if (data.msg) {
        navigate("/login");
        return;
      }
    } catch (e) {
      console.log("error fetching relationshiip", e);
    }
  }

  async function FetchGroupInfo() {
    //updateGroupRequested(false)
    try {
      const response = await fetch("http://localhost:8080/isgroupmember", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          loggedInUserID: LoggedInUserID,
          groupID: GroupID,
        }),
      });
      const data = await response.json();
      updateisGroupMember(data.ismember);
      updateGroupRequested(data.requested);

      //console.log("response from fetchgroupinfo", data);

      // console.log("response from fetchgroupinfo", data);
    } catch (e) {
      console.log("error fetching groupinfo", e);
    }
  }

  useEffect(() => {
    if (userID > 0) FetchRelationship();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userID]);

  useEffect(() => {
    if (GroupID > 0) FetchGroupInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GroupID]);

  // fetch chat history on chat user click
  const fetchChatsForm = new FormData();

  fetchChatsForm.append(
    "senderID",
    JSON.parse(localStorage.getItem("loggedInUser")).ID
  );
  fetchChatsForm.append("recipientID", props.id);

  // let object = {};
  // fetchChatsForm.forEach(function (value, key) {
  //   object[key] = value;
  // });

  async function fetchChatHistory() {
    const resp = await fetch("http://localhost:8080/sendprivatemessage", {
      method: "POST",
      credentials: "include",
      body: fetchChatsForm,
    });
    const data = await resp.json();
    console.log("messages data", data);
    // setMessages(data);
    updateChatMessages(data);
    if (props.notifier) {
      chatNotifsOnLogin.notifiers = chatNotifsOnLogin.notifiers.filter(
        (item) => item !== props.chatName
      );
      console.log("cnl check  --> ", chatNotifsOnLogin.notifiers);
      // updateChatNotifsOnLogin([]);
    }

    if (props.socketnotifier) {
      socketChatNotif.socketnotifiers = socketChatNotif.socketnotifiers.filter(
        (item) => item !== props.chatName
      );
      console.log("snf check  --> ", socketChatNotif.socketnotifiers);
    }
  }

  // fetch groupChathistory
  const groupChatsForm = new FormData();
  groupChatsForm.append("groupID", props.groupID);
  // get the groupID from the click

  async function fetchGroupMessages() {
    const resp = await fetch("http://localhost:8080/sendgroupmessages", {
      method: "POST",
      credentials: "include",
      body: groupChatsForm,
    });
    const data = await resp.json();
    console.log("group messages data, lets see what it is", groupMessages);
    updateGroupMessages(data);
  }

  if (props.type === "AllUsers") {
    return (
      <div
        role="presentation"
        onClick={(e) => {
          e.preventDefault();

          updateNavClicked(false);
          updateUserID(Number(e.currentTarget.id));
          updateDynamicID(e.currentTarget.id);
        }}
        className="SingleProfile"
        id={props.id}
      >
        <div className="ChatPic">
          <img src={props.avatar} width="25" height="25" alt="chat-pic" />
        </div>
        <p className="ChatName">
          {props.chatName}
          <small className="group-event-text">{props.eventText}</small>
        </p>
      </div>
    );
  }

  if (props.type === "AllGroups") {
    return (
      <div
        role="presentation"
        onClick={(e) => {
          e.preventDefault();
          updateNavClicked(false);
          updateGroupID(Number(e.currentTarget.id));
        }}
        className="SingleProfile"
        id={props.id}
      >
        <div className="ChatPic">
          <img src={props.avatar} width="25" height="25" alt="chat-pic" />
        </div>
        <p className="ChatName">
          {props.chatName}
          <small className="group-event-text">{props.eventText}</small>
        </p>
      </div>
    );
  }

  if (props.type === "Chats") {
    const checkUser = () => {
      if (
        (messages.length > 0 && show && messages[0].chatsender == props.id) ||
        (messages.length > 0 && show && messages[0].chatrecipient == props.id)
      ) {
        return messages;
      }
    };
    return (
      <div
        role="presentation"
        onClick={(e) => {
          e.preventDefault();
          updateLastClickedUser(props.id);
          if (!show) fetchChatHistory();
          setShow(true);
          //if show is true, check if the last sender/recipient is the person in the chatbox
          setName(props.chatName);
          setGroupClicked(false);

          console.log("props.id -> ", props.id);
          console.log("LAST CLICKED USER IN SPC -> ", lastClickedUser);

          console.log("message struct --> ", messages);
          // updateUserID(Number(e.currentTarget.id));
          //updateDynamicID(e.currentTarget.id);
        }}
        className="SingleProfile"
        id={props.id}
      >
        <ChatBox
          onClose={() => setShow(false)}
          show={show}
          name={name}
          id={props.id}
          data={checkUser()}
          avatar={props.avatar}
          groupClicked={groupClicked}
          chatNotifExists={props.socketnotifier}
          notifierID={props.notifierID}
        />

        <div className="ChatPic">
          <img src={props.avatar} width="25" height="25" alt="chat-pic" />
        </div>
        <p className="ChatName">
          {props.chatName}{" "}
          {props.notifier || props.socketnotifier ? (
            <FontAwesomeIcon icon={faMessage} className="chatNotifIcon" />
          ) : null}
          {/* {props.socketnotifier ? <span>++++</span> : null} */}
        </p>
      </div>
    );
  }

  if (props.type == "GroupChats") {
    return (
      <div
        className="SingleProfile"
        role="presentation"
        // id={props.groupID}
        onClick={(e) => {
          e.preventDefault();
          if (!show) fetchGroupMessages();
          setShow(true);
          setName(props.chatName);
          setGroupClicked(true);
          console.log("props.groupID???? ", props.groupID);
        }}
      >
        <ChatBox
          onClose={() => setShow(false)}
          show={show}
          name={name}
          id={props.groupID}
          data={groupMessages}
          avatar={props.avatar}
          groupClicked={groupClicked}
        />
        <div className="ChatPic">
          <img src={props.avatar} width="25" height="25" alt="chat-pic" />
        </div>
        <p className="ChatName">{props.chatName}</p>
      </div>
    );
  }

  if (props.type === "Navbar") {
    let PicPath =
      props.avatar === ""
        ? "../assets/img/ext/blue-placeholder.jpeg"
        : `../assets/img/ext/${props.avatar}`;

    return (
      <div role="presentation" className="Nav-SingleProfile" id={props.id}>
        <div className="ChatPic">
          <img src={PicPath} width="25" height="25" alt="chat-pic" />
        </div>
        <p className="ChatName">{props.chatName}</p>
      </div>
    );
  }
};

export default SingleProfileComponent;
