
import { CreateEventModal } from "../pages/home/components/CreateEventModal";
import {CreateGroupModal} from "../pages/home/components/CreateGroupsComponent"
import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MultipleProfilesComponent } from "../components/MultipleProfilesComponent";
import { response } from "express";
library.add(faCirclePlus, faLock, faUsers);

const SideProfileContainer = (props) => {
  const [show, setShow] = useState(false);
  const[users, setUsers] = useState('');

  useEffect(()=>{
    fetch("http://localhost:8080/dummyusers", {
      method: "GET",
      mode: "no-cors",
     })
     .then(response => response.json())
     .then(userdata => setUsers(userdata))
     .then(userdata => console.log('Received from go', userdata))
     .catch(error => console.log(object))


  },[])

  if (props.headers === "Groups") {
    return (
      <div className="MultipleProfiles">
      
        <div className="ChatTitle">
          {props.headers}{" "}  <FontAwesomeIcon onClick={() => setShow(true)} className="create-event-btn" icon="fa-solid fa-circle-plus" />
        <CreateGroupModal onClose={() => setShow(false)} show={show} />
        

          {/* <FontAwesomeIcon
          onClick={() => setShow(true)}
          className="create-event-btn"
          icon="fa-solid fa-circle-plus"
        />
        <CreateEventModal onClose={() => setShow(false)} show={show} /> */}
        </div>
        <div className="AllCumulativeData">
          <MultipleProfilesComponent users={props.data} />
        </div>
      </div>
    );
  } else if (props.headers ==="Users"){
  

console.log('hi');


  }else {

    return (
      <div className="MultipleProfiles">
        <div className="ChatTitle">
          {props.headers}{" "}
        
        </div>
        <div className="AllCumulativeData">
          <MultipleProfilesComponent users={props.data} />
        </div>
      </div>
    );
  }
};

export { SideProfileContainer };
