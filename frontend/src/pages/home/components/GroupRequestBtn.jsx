import { useContext } from "react";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserGroup,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { requestText } from "../../../components/UserRequestBtn";
library.add(faUserGroup, faUserLock);

const GroupRequestBtn = (props) => {
   const {
    GroupID,
    LoggedInUserID,
     updateGroupRequested,
    updateJoinText,
  } = useContext(LowerHeaderContext);

  // const [status, setStatus] = useState(
  //   props.hasRequested
  // );

  const handleClick = () => {
    updateJoinText(requestText)
    updateGroupRequested(true)
    // setStatus(
    //   props.hasRequested
    // );

    fetch("http://localhost:8080/joinGroup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        groupID: GroupID,
        loggedInUserID: LoggedInUserID
      })
    })
    // updateJoinText(requestText)
  };

  return (
    <button
          className={"group-request-btn"}
      onClick={handleClick}
    >
      {props.hasRequested}
    </button>
  );
};

export { GroupRequestBtn };
