import React from "react";
import "./AllChats.css";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faMessage } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// library.add(faMessage);


//this is currently being used for both Chats & Group chats, 
//will need to tinker to allow variability
//group-event-text css in AllChats.css 
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
            {/* <p className="ChatName"><FontAwesomeIcon icon="fa-regular fa-message" /></p> */}
        </div>
    );
};

export default ChatProfile;
