import "../index.css";
import AllChats from "../AllChats/Chats"
import Post from "../Posts/Post";
import NavBar from "../NavBar/NavBar";
import Users from "../Users/Users";
import Groups from "../Groups/Groups";


const LeftBodyDiv = ({ props}) => {
  return (
    <div className= "bd-side">
              <Users Users= {props} />

      <Groups Users ={props}/>
    </div>
  );
};


///////GROUPS////////////////////////////////////////////

// function GroupsHeader() {
//   return (
//     <div className="GroupsHead">
//       <div className="LeftSideTitle">Groups</div>
//       <input
//         type="search"
//         className="LeftSearch"
//         placeholder="&#128270; Search groups"
//       ></input>
//     </div>
//   );
// }

// const GroupNameAndPic = (props) => {
//   return (
//     <div className="NamePic">
//       <div className="GroupName">{props.group}</div>
//     </div>
//   );
// };

const DBData= {
  
  Headers : {chats: "Chats", groupchats: "Group Chats", users:"Users", Groups:"Groups"},
  Chats :["Tolu", "Sarmad", "Arnold", "Yonas"],
  ChatClasses : {parent: "UserChats", child: "ChatProfile"},
  GroupChats : ["AgendaZone", "Ski Club", "Suya Society", "SuperEaglesSupporters"],
  GroupChatClasses : {parent: "GroupChats", child: "GroupProfile"},
  Users :[ "Nate", "Keivon", "Ricky","Sarmad", "Tolu", "Arnold", "Yonas"],
  UsersClasses :{parent:"AllUsers", child:"AUser"},
  Groups: ["Black & White Army", "2011 Rashford Fan Club", "Sancho Support Club", "AirBnB crew"],
GroupClasses:{parent:"AllGroups", child:"AGroup"},
};


function MainBody() {
    return (
      <div className="MainBody">
        <LeftBodyDiv props = {DBData} />
        <div className="nav-and-post">
          <NavBar />
          <Post />
        </div>
        <AllChats props = {DBData}/>
      </div>
    );
  }

export {  MainBody };
