import ChatProfile from "../AllChats/ChatProfile";
import "./Groups.css";
import { ProfileBtn } from "../Profile/ProfileBtn";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { CreateGroupModal } from "./CreateGroupComponent";
library.add(faCirclePlus, faLock, faUsers);

import {
  
  
  faXmark,
 
} from "@fortawesome/free-solid-svg-icons";

const CreateGroupModal = ({show, onClose}) => {

    if (!show) {
        return null
    }

    return(
        <>

        <div className="cg-modal-container" onClick={onClose}>
        <div className="cg-modal" onClick={e => e.stopPropagation()}>
            <div className="cg-modal-header">
                <h3>Create Group</h3>     
          <FontAwesomeIcon
          onClick={ onClose}
            icon={faXmark}
            className="cg-modal-close"
            size="lg"
          />
            </div>
            <div className="cg-modal-body">
                <form className="cg-form">
                    <input className="cg-input" type="text" placeholder="enter group name"></input>
                    <input className="cg-input" type="text" placeholder="enter group description"></input>
                         <label htmlFor="avatar">
            Choose an image to be your group avatar (Optional)
          </label>
          <input
            type="file"
            name="group-avatar"
           
          />
                </form>
            </div>
            <div className="cg-modal-footer">
                    <button className="cg-submit-button" type="submit">Submit</button>
                    </div>
            </div>
        </div>
        </>
    )
}

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