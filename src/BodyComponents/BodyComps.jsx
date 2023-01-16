import "../index.css";
import AllChats from "../AllChats/Chats";
import NavBar from "../NavBar/NavBar";
import Users from "../Users/Users";
import Groups from "../Groups/Groups";
import PostsContainer from "../Posts/Post";
import EventBanner from "../Groups/Events/EventBanner";

const DBData = {
  Headers: {
    chats: "Chats",
    groupchats: "Group Chats",
    users: "Users",
    Groups: "Groups",
  },
  Chats: ["Tolu", "Sarmad", "Arnold", "Yonas"],
  ChatClasses: { parent: "UserChats", child: "ChatProfile" },
  GroupChats: [
    "AgendaZone",
    "Ski Club",
    "Suya Society",
    "SuperEaglesSupporters",
  ],
  GroupChatClasses: { parent: "GroupChats", child: "GroupProfile" },
  Users: ["Nate", "Keivon", "Ricky", "Sarmad", "Tolu", "Arnold", "Yonas"],
  UsersClasses: { parent: "AllUsers", child: "AUser" },
  Groups: [
    "Black & White Army",
    "2011 Rashford Fan Club",
    "Sancho Support Club",
    "AirBnB crew",
  ],
  GroupClasses: { parent: "AllGroups", child: "AGroup" },
};

const LeftBodyDiv = ({ props }) => {
  return (
    <div className="bd-side">
      <Users Users={props} />

      <Groups Users={props} />
    </div>
  );
};

function MainBody() {
  return (
    <div className="MainBody">
      <LeftBodyDiv props={DBData} />
      <div className="middle-div">
        <NavBar />
      <div className="nav-and-post">
    <EventBanner/>
    <EventBanner/>

    <EventBanner/>

        <PostsContainer />
    
      </div>
      </div>
      <AllChats props={DBData} />
    </div>
  );
}

export { MainBody };
