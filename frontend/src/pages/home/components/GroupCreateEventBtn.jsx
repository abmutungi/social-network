import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateEventModal } from "./CreateEventModal";


const GroupCreateEventBtn = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} className={"add-post-btn"}>
        <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
        <span className="icon-text">Event</span>
      </button>
      <CreateEventModal
      show = {show}
      onClose={() => setShow(false)}

      />
    </>
  );
};



export { GroupCreateEventBtn };
