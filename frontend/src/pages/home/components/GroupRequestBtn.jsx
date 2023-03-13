import { useState, useContext } from "react";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserGroup,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUserGroup, faUserLock);

const GroupRequestBtn = (props) => {
   const {
    GroupID,
    LoggedInUserID,
    // updateRequested,
  } = useContext(LowerHeaderContext);

  const [status, setStatus] = useState(
    <>
      <FontAwesomeIcon icon={faUserGroup} />
          <span className="icon-text">{props.requestJoin}</span>
    </>
  );

  const handleClick = () => {
    // updateRequested(true)
    setStatus(
      <>
        <FontAwesomeIcon icon={faUserLock} />{" "}
            <span className="icon-text">{props.requestSent}</span>
      </>
    );

    fetch("http://localhost:8080/joinGroup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        groupID: GroupID,
        loggedInUserID: LoggedInUserID
      })
    })

  };

  return (
    <button
          className={"group-request-btn"}
      onClick={handleClick}
    >
      {status}
    </button>
  );
};

export { GroupRequestBtn };
