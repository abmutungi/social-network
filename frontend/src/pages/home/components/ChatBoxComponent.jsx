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

// let dummyMessages = [
//   {
//     msgContent: "hi there",
//     user: "Yonas",
//     date: new Date().toDateString(),
//     isCurrentUser: true,
//   },
//   {
//     msgContent: "hola",
//     user: "Messi",
//     date: new Date().toDateString(),
//     isCurrentUser: false,
//   },
//   {
//     msgContent: "who's the best defender?",
//     user: "Yonas",
//     date: new Date().toDateString(),
//     isCurrentUser: true,
//   },
//   {
//     msgContent: "romero",
//     user: "Messi",
//     date: new Date().toDateString(),
//     isCurrentUser: false,
//   },
// ];

//  let chatBoxes = document.getElementsByClassName("chat-box-container");
//  for (const cBox of chatBoxes) {
//    if (cBox.id != name) {
//      console.log("Name in loop -> ", name);
//      console.log("cBox id -> ", cBox.id);
//      console.log("cBox attr -> ", cBox.attributes);
//    }
//  }

const ChatBox = ({ showChat, onClose, name, id, data }) => {
  const { socket } = useContext(SocketContext);

  const { updateMessages } = useContext(loggedInUserContext);
  const [newMsg, setNewMsg] = useState("");

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setChatFormValues({
  //     ...chatFormValues,
  //     [name]: value,
  //   });
  // };

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
    //   setMessages([
    //     ...messages,
    //     {
    //       msgContent: newMsg,
    //       user: JSON.parse(localStorage.getItem("loggedInUser")).FName,
    //       isCurrentUser: true,
    //       date: new Date().toDateString(),
    //     },
    //   ]);
    setNewMsg("");

    // }
  };

  let currentUser = name;

  console.log("name prop check --> ", name);

  if (socket != null) { 
  socket.onmessage = (e) => {
    // console.log("check message for recipient", JSON.parse(e.data));
    let data = JSON.parse(e.data)
      
    if (data.tipo == "allChats") {

      updateMessages(data.allChats);
    }
  }
}


  if (!showChat) {
    return null;
  } else{
    // socket.onmessage = (e) => {
    //   let data = JSON.parse(e.data)
      
    //   if (data.tipo == "allChats") {

    //     updateMessages(data.allChats);
    //   }

      // set messages to the new data being sent

    
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
