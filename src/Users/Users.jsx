import ChatProfile from "../AllChats/ChatProfile";
import "./Users.css";
import { useState } from "react";

import { CreateEventModal } from "../Groups/Events/CreateEventModal";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCirclePlus, faLock, faUsers);

const NamedUser = ({ users, chatuserclass}) => {

    return users.map((user, index) => {
      return <ChatProfile chatName={`${user}`} key={index} chatuserclass = {chatuserclass} />;
    });
  };
  
  
  const Users = (props) => {

    const [show, setShow] = useState(false)

    return (
      <div className={props.parentClass}>
        <div className="ChatTitle">{props.headers} <FontAwesomeIcon  onClick={() => setShow(true)} className="create-event-btn"  icon="fa-solid fa-circle-plus" />
        <CreateEventModal onClose={() => setShow(false)} show={show} />
        </div>
        <div className="AllCumulativeData">
        <NamedUser users={props.data} chatuserclass= {props.childClass} />
        </div>
      </div>
    );
  };
  

  export{ NamedUser, Users}
  export default Users