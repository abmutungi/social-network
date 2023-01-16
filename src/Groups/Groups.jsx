import ChatProfile from "../AllChats/ChatProfile";
import "./Groups.css";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { CreateGroupModal } from "./CreateGroupsComponent";

import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCirclePlus, faLock, faUsers);


const NamedGroup = ({ groups, groupclass}) => {

  
  
    return groups.map((user, index) => {
      return <ChatProfile chatName={`${user}`} key={index} chatuserclass = {groupclass} />;
    });
  };
  
  
  const Groups = ({ Users }) => {
    const [show, setShow] = useState(false)
    return (
      <div className={Users.GroupClasses.parent}>
        <div className="ChatTitle">{Users.Headers.Groups}  <FontAwesomeIcon   onClick={() => setShow(true)} className="cg-btn"  icon="fa-solid fa-circle-plus" />
        <CreateGroupModal onClose={() => setShow(false)} show={show}/>
        </div>
        <div className="AllCumulativeData">

        <NamedGroup groups={Users.Groups} groupclass= {Users.GroupClasses.child} />
        </div>
      </div>
    );
  };
  

  export default Groups