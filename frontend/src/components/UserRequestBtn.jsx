import { React, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserGroup,
  faUserLock,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
// import { UseIdFromUrl} from '../hooks/UseIdFromUrl'
library.add(faUserGroup, faUserLock, faCircleXmark);

import "../assets/css/ProfileBar.css";
import { LowerHeaderContext } from "../context/lowerheadercontext";

const followText = (
  <>
    <FontAwesomeIcon icon={faUserGroup} />
    <span className="icon-text">Follow</span>
  </>
);

const unfollowText = (
  <>
    <FontAwesomeIcon icon={faCircleXmark} />
    <span className="icon-text"> Unfollow</span>
  </>
);

const requestText = (
  <>
    <FontAwesomeIcon icon={faUserLock} />{" "}
    <span className="icon-text">Pending</span>
  </>
);

const UserRequestBtn = () => {
  // const [status, setStatus] = useState(props.followStatus);

  const {
    FollowText,
    updateFollowText,
    LoggedInUserID,
    userID,
    updateFollowing,
    PrivacyStatus,
    updateRequested,
  } = useContext(LowerHeaderContext);

  const handleClick = () => {
    if (!PrivacyStatus) {
      if (FollowText === followText) {
        fetch("http://localhost:8080/follow", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            userID: userID,
            loggedInUserID: LoggedInUserID,
          }),
        });
        //.then((document.getElementById("profileFollowBtn").disabled = true));
        updateFollowText(unfollowText);
        updateFollowing(true);
        console.log(`...now following ${userID}`);
      } else if (FollowText === unfollowText) {
        fetch("http://localhost:8080/unfollow", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            userID: userID,
            loggedInUserID: LoggedInUserID,
          }),
        });
        updateFollowText(followText);
        updateFollowing(false);
        console.log(`...unfollowing ${userID}`);
      }
    } else {
      if (FollowText == followText) {
        updateFollowText(requestText);
        fetch("http://localhost:8080/followRequest", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            notificationType: "followRequest",
            notifiyee: userID,
            notifier: LoggedInUserID,
          }),
        });
        updateFollowText(requestText);
        updateRequested(true);
        //updateFollowing(false);
        console.log(`...follow request sent to ${userID}`);
      } else if (FollowText === unfollowText) {
        updateFollowText(followText);
        fetch("http://localhost:8080/unfollow", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            userID: userID,
            loggedInUserID: LoggedInUserID,
          }),
        });
        updateFollowText(followText);
        updateRequested(false);
        console.log(`...unfollowing ${userID}`);
      }
    }
  };

  return (
    <button className="followIcon" id="profileFollowBtn" onClick={handleClick}>
      {FollowText}
    </button>
  );
};

export { followText, unfollowText, requestText, UserRequestBtn };
