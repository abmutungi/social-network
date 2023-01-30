import React, { useEffect } from "react";
import "../assets/css/AllChats.css";
import "../assets/css/Users.css";
import { LowerHeaderContext } from "../context/lowerheadercontext";
import { useContext } from "react";
import { followText, unfollowText } from "./UserRequestBtn";
import { useNavigate } from "react-router-dom";

const SingleProfileComponent = (props) => {
  const {
    updateUserID,
    updateGroupID,
    Following,
    updateFollowing,
    LoggedInUserID,
    userID,
    updateRequested,
    //FollowText,
    updateFollowText,
  } = useContext(LowerHeaderContext);

  const navigate = useNavigate();
  async function FetchRelationship(lgInUser, userProfile) {
    console.log("*********IS THIS FUNCTION RUNNING*****************");
    try {
      const response = await fetch("http://localhost:8080/followCheck", {
        method: "POST",
        body: JSON.stringify({
          loggedInUserID: lgInUser,
          userID: userProfile,
        }),
      });
      const data = await response.json();

      if (data.canFollow) {
        updateFollowing(false);
        updateFollowText(followText);
      } else if (data.following) {
        updateFollowing(true);
        updateFollowText(unfollowText);
      } else if (data.requested) updateRequested(true);
      // updateFollowText(requestText);

      console.log("************************************", Following, userID);
      console.log(data);
      if (data.msg) {
        navigate("/login");
        return;
      }
      //   console.log("STATIC BUTTON RENDER *****************");
      // }

      //console.log("*************DATA SENT************************", data);
    } catch (e) {
      console.log("error fetching relationshiip", e);
    }
  }

  useEffect(() => {
    FetchRelationship(LoggedInUserID, userID); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  if (props.type === "AllUsers") {
    return (
      <div
        role="presentation"
        onClick={(e) =>
          updateUserID(Number(e.currentTarget.id), updateFollowing(true))
        }
        className="SingleProfile"
        id={props.id}
      >
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

  if (props.type === "AllGroups") {
    return (
      <div
        role="presentation"
        onClick={(e) => updateGroupID(e.currentTarget.id)}
        className="SingleProfile"
        id={props.id}
        // creatorid = {props.creator}   - custom html tags??
      >
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
