import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { GroupInviteModal } from "./GroupInviteModal";

library.add(faUserPlus);

const GroupInviteBtn = () => {
  const [show, setShow] = useState(false);

  
  return (
    <>
    <button onClick={() => setShow(true)} className={"group-request-btn"}>
      <FontAwesomeIcon icon={faUserPlus} />
      <span className="icon-text">{"Invite"}</span>
    </button>
    <GroupInviteModal onClose={() => setShow(false)}show = {show}/>


    </>
  );
};







export { GroupInviteBtn };