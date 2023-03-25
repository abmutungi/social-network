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

const ChatBox = ({ show, onClose, name, id, data, avatar }) => {
  const { socket } = useContext(SocketContext);

  // const { updateMessages } = useContext(loggedInUserContext);
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

    // if (newMsg != "") {

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

  if (!show) {
    return null;
  } else if (socket != null) {
    // socket.onmessage = (e) => {
    //   console.log("check message for recipient", JSON.parse(e.data));
    //   // set messages to the new data being sent
    //   updateMessages(JSON.parse(e.data));
    // };
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
