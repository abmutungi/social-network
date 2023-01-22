import "../../../index.css";
import AllChats from "./Chats";
import NavBar from "./NavBar";
// import Groups from "../Groups/Groups";
import PostsContainer from "./Post";
import EventBanner from "./EventBanner";
import { AboutMe } from "./About";
import { Followers } from "./Followers";
import { Following } from "./Following";
import { MyGroups } from "./MyGroups";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/css/followers.css";
import { SideProfileContainer } from "../../../components/SideProfileContainer";
import { useState, useEffect } from "react";

import "../../../assets/css/Users.css";
import { LowerHeaderProvider } from "../../../context/lowerheadercontext";
import { LowerHeaderContext } from '../../../context/lowerheadercontext';
import { useContext } from 'react';

const DBData = {
  Headers: {
    chats: "Chats",
    groupchats: "Group Chats",
    users: "Users",
    Groups: "Groups",
  },
  Chats: [
    "Tolu",
    "Sarmad",
    "Arnold",
    "Yonas",
    "Tolu",
    "Sarmad",
    "Arnold",
    "Yonas",
    "Tolu",
    "Sarmad",
    "Arnold",
    "Yonas",
  ],
  ChatClasses: { parent: "UserChats", child: "ChatProfile" },
  GroupChats: [
    "AgendaZone",
    "Ski Club",
    "Suya Society",
    "SuperEaglesSupporters",
    "AgendaZone",
    "Ski Club",
    "Suya Society",
    "SuperEaglesSupporters",
  ],
  GroupChatClasses: { parent: "GroupChats", child: "GroupProfile" },
  AllUsers: [
    "Nate",
    "Keivon",
    "Ricky",
    "Sarmad",
    "Tolu",
    "Arnold",
    "Yonas",
    "Nate",
    "Keivon",
    "Ricky",
    "Sarmad",
    "Tolu",
    "Arnold",
    "Yonas",
    "Nate",
    "Keivon",
    "Ricky",
    "Sarmad",
    "Tolu",
    "Arnold",
    "Yonas",
  ],

  UsersClasses: {
    users: "AllUsers",
    groups: "AllGroups",
    chats: "UserChats",
    groupchats: "GroupChats",
    child: "AUser",
  },
  FollowersClasses: { parent: "AllFollowers", child: "AFollower" },
  Groups: [
    "Black & White Army",
    "2011 Rashford Fan Club",
    "Sancho Support Club",
    "AirBnB crew",

    "AgendaZone",
    "Ski Club",
    "Suya Society",
    "SuperEaglesSupporters",
    "AgendaZone",
    "Ski Club",
    "Suya Society",
    "SuperEaglesSupporters",
    "AgendaZone",
    "Ski Club",
    "Suya Society",
    "SuperEaglesSupporters",
  ],
  GroupClasses: { parent: "AllGroups", child: "AGroup" },
  AboutMe: {
    description:
      "Bienvenidos a la página de Facebook Oficial de Leo Messi. Welcome to the official Leo Messi Facebook.",
  },
};





const LeftBodyDiv = () => {


  const { DBAllUsers, updateinitialDB,AllGroupsData, updateAllGroupsData  } = useContext(LowerHeaderContext);

  //const[users, setUsers] = useState([]);

  async function fetchUsers(){
    try{
  const response = await fetch("http://localhost:8080/dummyusers");
  const data = await response.json();
  updateinitialDB(data)
  //setUsers(data)
  
  console.log('user data received', data);
    }catch(e){
      console.log('Error fetching users', e);
    }
  }


  async function fetchGroups(){
    try{
  const response = await fetch("http://localhost:8080/dummygroups");
  const data = await response.json();
  updateAllGroupsData(data)
  //setUsers(data)
  
  console.log('group data received', data);
    }catch(e){
      console.log('Error fetching groups', e);
    }
  }

  
  
  console.log('testDAllUsers', DBAllUsers);
  console.log('testAllGroupData', AllGroupsData);

  //console.log('check users post fetch', users)
  
  useEffect(()=>{
    fetchUsers()
    fetchGroups()
  },[])

  
  return (
    <>
      <div className="left-side">
        {/* <AboutMe about={DBData.AboutMe} /> */}

        <SideProfileContainer
          headers="Users"
          data= {DBAllUsers}
          childClass="AUser"
          type ="AllUsers"
            
        />

        <SideProfileContainer
          headers="Groups"
          data={AllGroupsData}
          childClass="AGroup"
          type ="AllGroups"

        />
      </div>
    </>
  );
};

function MainBody() {
  return (
    <div className="MainBody">
      <LeftBodyDiv />
      <div className="middle-div">
        <NavBar />
        <div className="nav-and-post">
          <EventBanner />
          <EventBanner />

          <EventBanner />

          <PostsContainer />
          {/* <Followers Followers={DBData} />
          <Following Following={DBData} />
          <MyGroups MyGroups={DBData} /> */}
        </div>
      </div>
      <AllChats />
    </div>
  );
}

export { MainBody, DBData };
