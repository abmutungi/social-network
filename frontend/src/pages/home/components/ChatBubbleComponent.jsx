import React from "react";

import "../../../assets/css/chatbox.css";

const ChatBubble = ({ msgContent, user, date, isCurrentUser }) => {
  const className = isCurrentUser ? "chat-bubble current-user" : "chat-bubble";
  return (
    <>
      <div className={className}>
        <p className="chat-msg">{msgContent}</p>
        <span>{[user, " ", date]}</span>
      </div>
    </>
  );
};

export { ChatBubble };
