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

// const requestText = (
//   <>
//     <FontAwesomeIcon icon={faUserLock} />{" "}
//     <span className="icon-text">Requested</span>
//   </>
// );

const UserRequestBtn = () => {
  // const [status, setStatus] = useState(props.followStatus);

  const {
    FollowText,
    updateFollowText,
    LoggedInUserID,
    userID,
    updateFollowing,
  } = useContext(LowerHeaderContext);

  const handleClick = () => {
    // if (props.isPublic) {
    if (FollowText === followText) {
      fetch("http://localhost:8080/follow", {
        method: "POST",
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
        body: JSON.stringify({
          userID: userID,
          loggedInUserID: LoggedInUserID,
        }),
      });
      updateFollowText(followText);
      updateFollowing(false);
      console.log(`...unfollowing ${userID}`);
    }

    //   if (FollowText == followText) {
    //     updateFollowText(requestText);
    //     fetch("http://localhost:8080/followRequest", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         notificationType: "followRequest",
    //         notifiyee: 1,
    //         notifier: 3,
    //       }),
    //     });
    //     console.log("...follow request sent to Arnold Mutungi");
    //   } else if (FollowText === unfollowText) {
    //     updateFollowText(followText);
    //     fetch("http://localhost:8080/unfollow", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         userID: 3,
    //         followerID: 1,
    //       }),
    //     });
    //     console.log("...unfollowing Arnold Mutungi");
    //   }
    // }
  };

  return (
    <button className="followIcon" id="profileFollowBtn" onClick={handleClick}>
      {FollowText}
    </button>
  );
};

export { followText, unfollowText, UserRequestBtn };
