import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserNinja,
  faWindowMinimize,
  faXmark,
  faImage,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

const ChatBox = () => {
  return (
    <>
      <div className="chat-box-container">
        <div className="chat-box-header">
          <FontAwesomeIcon
            icon={faUserNinja}
            className="chat-header-user-logo"
            size="xl"
          />
          First Name Last Name
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
        <div className="chat-box-body"></div>
        <div className="chat-box-footer">
          <FontAwesomeIcon
            icon={faImage}
            className="chat-footer-image-logo"
            size="lg"
          />
          <input type="text" placeholder="Enter your message...."></input>
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
