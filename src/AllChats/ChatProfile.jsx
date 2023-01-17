import React from "react";
import "./AllChats.css";



const ChatProfile = (props) => {
    return (
        <div className={props.chatuserclass}>
            <a className="ChatPic" href="https://www.facebook.com/">
                <img
                    src="https://www.facebook.com/images/fb_icon_325x325.png"
                    width="25"
                    height="25"
                    alt="chat-pic"
                />
            </a>
            <p className="ChatName">
                {props.chatName}<small className="group-event-text">{props.eventText}</small>
            </p>
        </div>
    );
};

export default ChatProfile;
