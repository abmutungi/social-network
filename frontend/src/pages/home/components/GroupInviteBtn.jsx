import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { GroupInviteModal } from "./GroupInviteModal";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";

library.add(faUserPlus);

const GroupInviteBtn = () => {
  const [show, setShow] = useState(false);
  const { GroupID, updateGroupInvitees } =
    useContext(LowerHeaderContext);

  async function GetGroupInvitees() {
    const resp = await fetch("http://localhost:8080/getgroupinvitees", {
      method: "POST",
      body: GroupID,
    });

    const data = await resp.json();

    console.log("Potential group members ---> ", data);
    updateGroupInvitees(data)
  }

  const HandleClick = () => {
    GetGroupInvitees();
    setShow(true);
  };

  return (
    <>
      <button onClick={HandleClick} className={"group-request-btn"}>
        <FontAwesomeIcon icon={faUserPlus} />
        <span className="icon-text">{"Invite"}</span>
      </button>
      <GroupInviteModal onClose={() => setShow(false)} show={show} />
    </>
  );
};

export { GroupInviteBtn };