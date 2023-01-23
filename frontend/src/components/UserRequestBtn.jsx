import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserGroup, faUserLock } from "@fortawesome/free-solid-svg-icons";
// import { UseIdFromUrl} from '../hooks/UseIdFromUrl'
library.add(faUserGroup, faUserLock);

import "../assets/css/ProfileBar.css";

const UserRequestBtn = (props) => {
  const [status, setStatus] = useState(
    <>
      <FontAwesomeIcon icon={faUserGroup} />{" "}
      <span className="icon-text">Follow</span>
    </>
  );

  const handleClick = () => {
    if (props.isPublic) {
      setStatus(
        <>
          <FontAwesomeIcon icon={faUserGroup} />{" "}
          <span className="icon-text"> Following</span>
        </>
      );

      fetch("http://localhost:8080/follow", {
        method: "POST",
        body: JSON.stringify({
          userID: 1, followerID: 3
        }),
      });

      //.then((document.getElementById("profileFollowBtn").disabled = true));

      console.log("...now following Arnold Mutungi");
    } else {
      setStatus(
        <>
          <FontAwesomeIcon icon={faUserLock} />{" "}
          <span className="icon-text">Requested</span>
        </>
      );
      fetch("http://localhost:8080/followRequest", {
        method: "POST",
        body: JSON.stringify({
          notificationType: "followRequest",
          notifiyee: 1,
          notifier: 3,
        }),
      });

      console.log("...follow request sent to Arnold Mutungi");
    }
  };

  return (
    <button className="followIcon" id="profileFollowBtn" onClick={handleClick}>
      {status}
    </button>
  );
};

export { UserRequestBtn };
