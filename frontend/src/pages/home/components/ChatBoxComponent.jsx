import React, { useState, useContext, useEffect, useRef } from "react";

import { ChatBubble } from "./ChatBubbleComponent";
import "../../../assets/css/chatbox.css";
import { SocketContext } from "../../../context/webSocketContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  // faImage,
  // faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

// import { loggedInUserContext } from "../../../context/loggedInUserContext";

const ChatBox = ({
  show,
  onClose,
  name,
  id,
  data,
  avatar,
  groupClicked,
  chatNotifExists,
  notifierID,
}) => {
  const { socket, updateSocketChatNotifs, updateLastClickedUser } =
    useContext(SocketContext);

  // const { updateMessages } = useContext(loggedInUserContext);
  const [newMsg, setNewMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("checking if group has been clicked", groupClicked);
    const storeMessageForm = new FormData(e.target);
    storeMessageForm.append(
      "loggedInUser",
      JSON.parse(localStorage.getItem("loggedInUser")).ID
    );
    var messageObject = {};

    // this is for group messages
    if (groupClicked) {
      storeMessageForm.append("type", "newGroupMessage");
      // console.log("checking group id", id);
      storeMessageForm.append("groupID", id);
      storeMessageForm.forEach((value, key) => (messageObject[key] = value));

      // send groupMessageObject through the socket
      console.log("checking group message form", messageObject);

      socket.send(JSON.stringify(messageObject));
    } else {
      // this is for private messages

      storeMessageForm.append("recipientID", id);
      storeMessageForm.append("type", "newMessage");

      storeMessageForm.forEach((value, key) => (messageObject[key] = value));

      // sending through the socket that a new message has been sent
      socket.send(JSON.stringify(messageObject));
    }

    // }
    setNewMsg("");
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    // scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const currentUserCheck = (mess) => {
    return JSON.parse(localStorage.getItem("loggedInUser")).FName == mess;
  };
  let currentUser = name;

  console.log("name prop check --> ", name);

  // const deleteNotif = () => {
  //   if (chatNotifExists && notifierID === id) {
  //     updateSocketChatNotifs(false);
  //   }
  // };

  // const combinedClickHandler = () => {
  //   onClose();
  //   deleteNotif();
  // };

  if (!show) {
    return null;
  }

  // console.log("checking group messages in chatbox", data);
  return (
    <>
      <div
        role="presentation"
        className="chat-modal-container"
        onClick={onClose}
      >
        <div className="chat-box-container" id={name}>
          <div
            className="chat-box-header"
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <img className="chat-box-av" src={avatar} alt="" />
            <span className="chat-box-name">{currentUser}</span>

            <FontAwesomeIcon
              onClick={() => {
                onClose();
                updateLastClickedUser(0);
              }}
              icon={faXmark}
              className="chat-header-close"
              size="lg"
            />
          </div>
          <div className="chat-box-body">
            {data?.map((message, index) => (
              <ChatBubble
                key={index}
                msgContent={message.message}
                user={message.senderName}
                isCurrentUser={currentUserCheck(message.senderName)}
                date={message.chatDate}
              ></ChatBubble>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="chat-box-footer">
            <form className="chat-box-form" onSubmit={handleSubmit}>
              <input
                className="msg-input"
                type="text"
                name="msgContent"
                placeholder="Enter your message...."
                value={newMsg}
                onChange={(e) => {
                  setNewMsg(e.target.value);
                }}
              ></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { ChatBox };
