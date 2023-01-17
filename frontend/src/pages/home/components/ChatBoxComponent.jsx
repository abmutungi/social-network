import React, {useState} from "react";

import { ChatBubble } from "./ChatBubbleComponent";
import "../../../assets/css/chatbox.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserNinja,
  faWindowMinimize,
  faXmark,
  faImage,
  faFaceSmile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

let currentUser = "Yonas Million"

let dummyMessages = [{msgContent: "hi there",
user: "Yonas",
date: new Date().toDateString(),
isCurrentUser: true,
}, {msgContent: "hola",
user: "Messi",
date: new Date().toDateString(),
isCurrentUser: false,}, {msgContent: "who's the best defender?",
user: "Yonas",
date: new Date().toDateString(),
isCurrentUser: true,}, {msgContent: "romero",
user: "Messi",
date: new Date().toDateString(),
isCurrentUser: false,}]

const ChatBox = () => {

  const [messages, setMessages] = useState(dummyMessages)
  const [newMsg, setNewMsg] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMsg != "") {
      setMessages([...messages,{msgContent:newMsg, user:currentUser, isCurrentUser: true, date: new Date().toDateString()}])
      setNewMsg("")
    }
  }

  return (
    <>
      <div className="chat-box-container">
        <div className="chat-box-header">
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
            icon={faXmark}
            className="chat-header-close"
            size="lg"
          />
        </div>
        <div className="chat-box-body">{messages.map((message, index) => (
          <ChatBubble key={index} msgContent={message.msgContent} user={message.user} isCurrentUser={message.isCurrentUser} date={message.date}></ChatBubble>
        ))}
        </div>
        <div className="chat-box-footer">
          <FontAwesomeIcon
            icon={faImage}
            className="chat-footer-image-logo"
            size="lg"
          />
         <form onSubmit={handleSubmit}> <input className="msg-input" type="text" placeholder="Enter your message...." value={newMsg} onChange={(e) => setNewMsg(e.target.value)}></input><button><i><FontAwesomeIcon icon={faPaperPlane} className="msg-btn"size="xl" type="submit"/></i></button></form>
          <FontAwesomeIcon
            icon={faFaceSmile}
            className="chat-footer-emoji-logo"
            size="lg"
          />
        </div>
      </div>
    </>
  );
};

export { ChatBox };