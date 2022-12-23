import React from "react";
import "./AllChats.css";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faMessage } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// library.add(faMessage);

const ChatProfile = (props) => {
    return (
        <div className="ChatProfile">
            <a className="ChatPic" href="https://www.facebook.com/">
                <img
                    src="https://www.facebook.com/images/fb_icon_325x325.png"
                    width="25"
                    height="25"
                    alt="chat-pic"
                />
            </a>
            <p className="ChatName">
                {props.chatName}
            </p>
            {/* <p className="ChatName"><FontAwesomeIcon icon="fa-regular fa-message" /></p> */}
        </div>
    );
};

export default ChatProfile;
