// import { CreateEventModal } from "../pages/home/components/CreateEventModal";
import { CreateGroupModal } from "../pages/home/components/CreateGroupsComponent";
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

  if (props.headers === "Groups") {
    return (
      <div className="MultipleProfiles">
        <div className="ChatTitle">
          Groups{" "}
          <FontAwesomeIcon
            onClick={() => setShow(true)}
            className="create-event-btn"
            icon="fa-solid fa-circle-plus"
          />
          <CreateGroupModal onClose={() => setShow(false)} show={show} />
        </div>
        <div className="AllCumulativeData">
          <MultipleProfilesComponent users={props.data} type={props.type} />
        </div>
      </div>
    );
  } else if (props.headers === "Users") {
    //console.log('Checking passed data SPC Users', props);
    return (
      <div className="MultipleProfiles">
        <div className="ChatTitle">{props.headers}</div>
        <div className="AllCumulativeData">
          <MultipleProfilesComponent users={props.data} type={props.type} />
        </div>
      </div>
    );
  } else if (props.headers === "Chats") {
    return (
      <div className="MultipleProfiles">
        <div className="ChatTitle">{props.headers} </div>
        <div className="AllCumulativeData">
          <MultipleProfilesComponent users={props.data} type={props.type} />
        </div>
      </div>
    );
  } else {
    // this is the condition for group chats
    return (
      <div className="MultipleProfiles">
        <div className="ChatTitle">{props.headers} </div>
        <div className="AllCumulativeData">
          <MultipleProfilesComponent users={props.data} type={props.type} />
        </div>
      </div>
    );
  }
};

export { SideProfileContainer };
