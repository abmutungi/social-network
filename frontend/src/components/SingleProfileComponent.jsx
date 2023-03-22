import React from "react";
import "../assets/css/AllChats.css";
import "../assets/css/Users.css";
import { LowerHeaderContext } from "../context/lowerheadercontext";
import { useContext, useEffect, useState } from "react";
import { followText, unfollowText, requestText } from "./UserRequestBtn";
import { useNavigate } from "react-router-dom";
import { ChatBox } from "../pages/home/components/ChatBoxComponent";
import { loggedInUserContext } from "../context/loggedInUserContext";

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
    updateNavClicked
  } = useContext(LowerHeaderContext);

  const { messages, updateMessages } = useContext(loggedInUserContext);
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

  if (props.type === "AllUsers") {
   

    return (
      <div
        role="presentation"
        onClick={(e) => {
          e.preventDefault();

          updateNavClicked(false)
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
          updateNavClicked(false)
          updateGroupID(Number(e.currentTarget.id));
        }}
        className="SingleProfile"
        id={props.id}
      >
        <div className="ChatPic">
          <img
            src={props.avatar}
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
        />
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


  if (props.type === "Navbar") {
 let PicPath =
    props.avatar === ""
      ? "../assets/img/ext/blue-placeholder.jpeg"
      : `../assets/img/ext/${props.avatar}`;



    return (
      <div
        role="presentation"
     
        className="Nav-SingleProfile"
        id={props.id}
      >
        <div className="ChatPic">
          <img src={PicPath} width="25" height="25" alt="chat-pic" />
        </div>
        <p className="ChatName">
          {props.chatName}
        </p>
      </div>
    );
  }
};

export default SingleProfileComponent;
