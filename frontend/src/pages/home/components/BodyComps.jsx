import "../../../index.css";
import AllChats from "./Chats";
import NavBar from "./NavBar";
// import Groups from "../Groups/Groups";
import PostsContainer from "./Post";
import EventBanner from "./EventBanner";
import { AboutMe } from "./About";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/css/followers.css";
import { SideProfileContainer } from "../../../components/SideProfileContainer";
import { useEffect } from "react";

import "../../../assets/css/Users.css";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { useContext } from "react";

const DBData = {
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
  AllUsers: ["Nate", "Keivon", "Ricky", "Sarmad", "Tolu", "Arnold", "Yonas"],
  Followers: ["Nate", "Keivon", "Ricky", "Sarmad", "Tolu", "Arnold", "Yonas"],

  UsersClasses: {
    users: "AllUsers",
    groups: "AllGroups",
    chats: "UserChats",
    groupchats: "GroupChats",
    child: "AUser",
  },
  FollowersClasses: { parent: "AllFollowers", child: "AFollower" },
};

const LeftBodyDiv = () => {
  const {
    DBAllUsers,
    updateinitialDB,
    AllGroupsData,
    updateAllGroupsData,
    AboutText,
  } = useContext(LowerHeaderContext);

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:8080/dummyusers");
      const data = await response.json();

      updateinitialDB(data);

      console.log("user data received", data);
    } catch (e) {
      console.log("Error fetching users", e);
    }
  }

  async function fetchGroups() {
    try {
      const response = await fetch("http://localhost:8080/getgroupdata");
      const data = await response.json();
      updateAllGroupsData(data);

      console.log("group data received", data);
    } catch (e) {
      console.log("Error fetching groups", e);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchGroups();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="left-side">
        <AboutMe text={AboutText} />

        <SideProfileContainer
          headers="Users"
          data={DBAllUsers}
          childClass="AUser"
          type="AllUsers"
        />

        <SideProfileContainer
          headers="Groups"
          data={AllGroupsData}
          childClass="AGroup"
          type="AllGroups"
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
