import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserGroup,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUserGroup, faUserLock);

const GroupRequestBtn = (props) => {
  const [status, setStatus] = useState(
    <>
      <FontAwesomeIcon icon={faUserGroup} />
          <span className="icon-text">{props.requestJoin}</span>
    </>
  );

  const handleClick = () => {
    setStatus(
      <>
        <FontAwesomeIcon icon={faUserLock} />{" "}
            <span className="icon-text">{props.requestSent}</span>
      </>
    );
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
