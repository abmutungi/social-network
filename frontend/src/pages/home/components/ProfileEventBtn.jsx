import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
library.add(faCalendarDays);

import { CreateEventModal } from "./CreateEventModal";

const ProfileEventBtn = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} className={"add-event-btn"}>
        <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
        <span className="icon-text">Event</span>
      </button>
      <CreateEventModal onClose={() => setShow(false)} show={show} />
    </>
  );
};

export { ProfileEventBtn };
