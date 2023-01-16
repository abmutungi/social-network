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
  
  
  const Users = ({ Users }) => {
    const [show, setShow] = useState(false)

    return (
      <div className={Users.UsersClasses.parent}>
        <div className="ChatTitle">{Users.Headers.users} <FontAwesomeIcon  onClick={() => setShow(true)} className="create-event-btn"  icon="fa-solid fa-circle-plus" />
        <CreateEventModal onClose={() => setShow(false)} show={show} />
        </div>
        <div className="AllCumulativeData">
        <NamedUser users={Users.Users} chatuserclass= {Users.UsersClasses.child} />
        </div>
      </div>
    );
  };
  

  export default Users