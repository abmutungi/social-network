import React, { useState, useContext } from "react";

import { ChatBubble } from "./ChatBubbleComponent";
import "../../../assets/css/chatbox.css";
import { SocketContext } from "../../../context/webSocketContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserNinja,
  faWindowMinimize,
  faXmark,
  faImage,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

import { loggedInUserContext } from "../../../context/loggedInUserContext";

const ChatBox = ({ show, onClose, name, id, data }) => {
  const { socket, messages } = useContext(SocketContext);

  const [newMsg, setNewMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storeMessageForm = new FormData(e.target);

    storeMessageForm.append(
      "loggedInUser",
      JSON.parse(localStorage.getItem("loggedInUser")).ID
    );
    storeMessageForm.append("recipientID", id);
    storeMessageForm.append("type", "newMessage");

    var messageObject = {};
    storeMessageForm.forEach((value, key) => (messageObject[key] = value));

    console.log("checking message object", messageObject);

    // sending through the socket that a new message has been sent
    socket.send(JSON.stringify(messageObject));

    for (const v of storeMessageForm.values()) {
      console.log("v check -> ", v);
    }
    setNewMsg("");

    // }
  };

  let currentUser = name;

  console.log("name prop check --> ", name);

  if (!show) {
    return null;
  }

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
            <FontAwesomeIcon
              icon={faUserNinja}
              className="chat-header-user-logo"
              size="xl"
            />
            {currentUser}
            <FontAwesomeIcon
              icon={faWindowMinimize}
              className="chat-header-minimize"
              size="lg"
            />
            <FontAwesomeIcon
              onClick={onClose}
              icon={faXmark}
              className="chat-header-close"
              size="lg"
            />
          </div>
          <div className="chat-box-body">
            {data.map((message, index) => (
              <ChatBubble
                key={index}
                msgContent={message.message}
                // need to add first name, of sender, currently sending back ids
                user={message.chatsender}
                isCurrentUser={message.isCurrentUser}
                date={message.chatDate}
              ></ChatBubble>
            ))}
          </div>
          <div className="chat-box-footer">
            <FontAwesomeIcon
              icon={faImage}
              className="chat-footer-image-logo"
              size="lg"
            />
            {/* <button><i><FontAwesomeIcon icon={faPaperPlane} className="msg-btn"size="xl" type="submit"/></i></button> */}
            <form onSubmit={handleSubmit}>
              {" "}
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
            <FontAwesomeIcon
              icon={faFaceSmile}
              className="chat-footer-emoji-logo"
              size="lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { ChatBox };
