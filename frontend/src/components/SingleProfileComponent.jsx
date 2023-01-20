import React from "react";
import "../assets/css/AllChats.css"
import "../assets/css/Users.css"
import { LowerHeaderContext } from "../context/lowerheadercontext";
import { useContext } from "react";

const SingleProfileComponent = (props) => {

  const getID =()=>{
    
  }


 // console.log('props from singleprof', props);
  if(props.type ==='AllUsers'){
    return (
      <div className="SingleProfile" id={props.id} >
        <div className="ChatPic">
          <img
            src="https://www.facebook.com/images/fb_icon_325x325.png"
            width="25"
            height="25"
            alt="chat-pic"
          />
        </div>
        <p className="ChatName">
          {props.chatName}
          <small className="group-event-text">{props.eventText}</small>
        </p>
      </div>
    );
    }
  };

export default SingleProfileComponent;
