
import { CreateEventModal } from "../Groups/Events/CreateEventModal";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MultipleProfilesComponent } from "../components/MultipleProfilesComponent";
library.add(faCirclePlus, faLock, faUsers);

const SideProfileContainer = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="MultipleProfiles">
      <div className="ChatTitle">
        {props.headers}{" "}
        <FontAwesomeIcon
          onClick={() => setShow(true)}
          className="create-event-btn"
          icon="fa-solid fa-circle-plus"
        />
        <CreateEventModal onClose={() => setShow(false)} show={show} />
      </div>
      <div className="AllCumulativeData">
        <MultipleProfilesComponent users={props.data} />
      </div>
    </div>
  );
};

export { SideProfileContainer };
