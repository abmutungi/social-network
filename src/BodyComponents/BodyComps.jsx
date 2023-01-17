import "../index.css";
import AllChats from "../AllChats/Chats";
import NavBar from "../NavBar/NavBar";
import Users from "../Users/Users";
import Groups from "../Groups/Groups";
import PostsContainer from "../Posts/Post";
import EventBanner from "../Groups/Events/EventBanner";
import { AboutMe } from "../About/About";
import { Followers } from "../Followers/Followers";
import { Following } from "../Followers/Following";
import { MyGroups } from "../Groups/MyGroups";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Followers/followers.css";

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
  AllUsers:["Nate", "Keivon", "Ricky", "Sarmad", "Tolu", "Arnold", "Yonas"],

  
   UsersClasses: { users: "AllUsers", groups:"AllGroups", chats: "UserChats", groupchats:"GroupChats", child: "AUser" },
  FollowersClasses: { parent: "AllFollowers", child: "AFollower" },
  Groups: [
    "Black & White Army",
    "2011 Rashford Fan Club",
    "Sancho Support Club",
    "AirBnB crew",
    "Black & White Army",
    "2011 Rashford Fan Club",
    "Sancho Support Club",
    "AirBnB crew",
  ],
  GroupClasses: { parent: "AllGroups", child: "AGroup" },
  AboutMe: {
    description:
      "Bienvenidos a la página de Facebook Oficial de Leo Messi. Welcome to the official Leo Messi Facebook.",
  },
}


const LeftBodyDiv = () => {
  return (
    <>
      <div className="left-side">
        <AboutMe about={DBData.AboutMe} />
  
        <Users parentClass="AllUsers" headers="Users" data={DBData.AllUsers} childClass={DBData.UsersClasses.child}/>
      
        <Users parentClass="AllGroups" headers="Groups" data={DBData.Groups} childClass={DBData.GroupClasses.child}/>
       
      </div>
     
    </>
  );
};





function MainBody() {
  return (
    
    <div className="MainBody">
      <LeftBodyDiv  />
      <div className="middle-div">
        <NavBar />
        <div className="nav-and-post">
          <EventBanner />
          <EventBanner />

          <EventBanner />

          <PostsContainer />
          <Followers Followers={DBData} />
          <Following Following={DBData} />
          <MyGroups MyGroups={DBData} />
        </div>
      </div>
      <AllChats  />
    </div>
  );
}

export { MainBody, DBData };
