import React from "react";
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
  } = useContext(LowerHeaderContext);

  const { messages, updateMessages } = useContext(loggedInUserContext);

  const { groupMessages, updateGroupMessages } = useContext(SocketContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

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
    updateMessages(data);
  }
  // sendPrivateMessageInfo();

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
          updateGroupID(Number(e.currentTarget.id));
        }}
        className="SingleProfile"
        id={props.id}
        // creatorid = {props.creator}   - custom html tags??
      >
        <div className="ChatPic">
          <img
            src="https://www.facebook.com/images/fb_icon_325x325.png"
            width="25"
            height="25"
            alt="chat-pic"
          />
        </div>
        <p className="ChatName">
          {props.chatName}
          <small className="group-event-text">{props.eventText}</small>
        </p>
      </div>
    );
  }

  if (props.type === "Chats") {
    return (
      <div
        role="presentation"
        onClick={(e) => {
          e.preventDefault();
          if (!show) fetchChatHistory();
          setShow(true);
          setName(props.chatName);
          console.log("props.id -> ", props.id);
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
          data={messages}
          avatar={props.avatar}
        />
        <div className="ChatPic">
          <img src={props.avatar} width="25" height="25" alt="chat-pic" />
        </div>
        <p className="ChatName">{props.chatName}</p>
      </div>
    );
  }

  if (props.type == "GroupChats") {
    return (
      <div
        className="SingleProfile"
        role="presentation"
        // id={props.id}
        onClick={(e) => {
          e.preventDefault();
          if (!show) fetchGroupMessages();
          setShow(true);
          setName(props.chatName);
          // console.log("props.groupID???? ", props.groupID);
          // console.log("props.id -> ", props.id);
          // updateUserID(Number(e.currentTarget.id));
          //updateDynamicID(e.currentTarget.id);
        }}
      >
        <ChatBox
          onClose={() => setShow(false)}
          show={show}
          name={name}
          id={props.id}
          data={groupMessages}
          avatar={props.avatar}
        />
        <div className="ChatPic">
          <img src={props.avatar} width="25" height="25" alt="chat-pic" />
        </div>
        <p className="ChatName">{props.chatName}</p>
      </div>
    );
  }
};

export default SingleProfileComponent;
