import { useContext } from "react";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserGroup,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { requestText } from "../../../components/UserRequestBtn";
import { SocketContext } from "../../../context/webSocketContext";
library.add(faUserGroup, faUserLock);

const GroupRequestBtn = (props) => {
  const { socket} = useContext(SocketContext)
   const {
    GroupID,
     LoggedInUserID,
    GroupRequested,
     updateGroupRequested,
    updateJoinText,
  } = useContext(LowerHeaderContext);

  // const [status, setStatus] = useState(
  //   props.hasRequested
  // );

  const handleClick = () => {
    updateJoinText(requestText)
    // setStatus(
      //   props.hasRequested
      // );
      
      // updateJoinText(requestText)
    if (!GroupRequested) {
      socket.send(JSON.stringify({
        groupID: GroupID,
        loggedInUserID: LoggedInUserID,
        type: "groupNotifs"
      }))
    }
      updateGroupRequested(true)
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
