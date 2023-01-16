import "../index.css";
import AllChats from "../AllChats/Chats";
import NavBar from "../NavBar/NavBar";
import Users from "../Users/Users";
import Groups from "../Groups/Groups";
import PostsContainer from "../Posts/Post";
import { AboutMe } from "../About/About";
import { Followers } from "../Followers/Followers";
import { Following } from "../Followers/Following";
import {MyGroups} from "../Groups/MyGroups";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Followers/followers.css"

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
  FollowersClasses:{parent: "AllFollowers", child: "AFollower"},
  Groups: [
    "Black & White Army",
    "2011 Rashford Fan Club",
    "Sancho Support Club",
    "AirBnB crew",
  ],
  GroupClasses: { parent: "AllGroups", child: "AGroup" },
  AboutMe: {description: "Bienvenidos a la página de Facebook Oficial de Leo Messi. Welcome to the official Leo Messi Facebook."
}
};

const LeftBodyDiv = ({ props }) => {
  return (
    <>
    <div className="l-side">
    <AboutMe about={DBData.AboutMe}/>
    <div className="bd-side">
    <div className={"AllUsers"}>
        <div className="ChatTitle">Users</div>
      <Users Users={props} />
      </div>
      <div className="AllGroups">
        <div className="ChatTitle">Groups<FontAwesomeIcon className="create-group-btn"  icon="fa-solid fa-circle-plus" />
        </div>
      <Groups Users={props} />
        </div>
    </div>
    </div>

    </>
  );
};

function MainBody() {
  return (
    <div className="MainBody">
      <LeftBodyDiv props={DBData} />
      <div className="middle-div">
        <NavBar />
      <div className="nav-and-post">
        <PostsContainer />
        <Followers Followers={DBData}/>
        <Following Following={DBData}/>
        <MyGroups MyGroups={DBData}/>
      </div>
      </div>
      <AllChats props={DBData} />
    </div>
  );
}

export { MainBody};
