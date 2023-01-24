import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserGroup, faUserLock , faCircleXmark} from "@fortawesome/free-solid-svg-icons";
// import { UseIdFromUrl} from '../hooks/UseIdFromUrl'
library.add(faUserGroup, faUserLock, faCircleXmark);

import "../assets/css/ProfileBar.css";

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
    <span className="icon-text">Requested</span>
  </>
);

const UserRequestBtn = (props) => {
  const [status, setStatus] = useState(props.followStatus);

  const handleClick = () => {
    if (props.isPublic) {
      if (status === followText) {
        setStatus(unfollowText);

        fetch("http://localhost:8080/follow", {
          method: "POST",
          body: JSON.stringify({
            userID: 3,
            followerID: 1,
          }),
        });
        //.then((document.getElementById("profileFollowBtn").disabled = true));
        console.log("...now following Arnold Mutungi");
      } else if (status === unfollowText) {
        setStatus(followText);
        fetch("http://localhost:8080/unfollow", {
          method: "POST",
          body: JSON.stringify({
            userID: 3,
            followerID: 1,
          }),
        });
        console.log("...unfollowing Arnold Mutungi");
      }
    } else {
      if (status == followText) {
        setStatus(requestText);
        fetch("http://localhost:8080/followRequest", {
          method: "POST",
          body: JSON.stringify({
            notificationType: "followRequest",
            notifiyee: 1,
            notifier: 3,
          }),
        });
        console.log("...follow request sent to Arnold Mutungi");
      } else if (status === unfollowText) {
        setStatus(followText);
        fetch("http://localhost:8080/unfollow", {
          method: "POST",
          body: JSON.stringify({
            userID: 3,
            followerID: 1,
          }),
        });
        console.log("...unfollowing Arnold Mutungi");
      }
    }
  };

  return (
    <button className="followIcon" id="profileFollowBtn" onClick={handleClick}>
      {status}
    </button>
  );
};

export { followText, UserRequestBtn };
