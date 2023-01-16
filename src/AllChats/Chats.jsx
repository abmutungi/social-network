import React from "react";
import ChatProfile from "./ChatProfile";
import "./AllChats.css";
import GroupChats from "./GroupChats";


/*Key arg in map required, currently using arr index, 
could/should use userID instead */
const ChatUsers = ({ users, chatuserclass}) => {
  return users.map((user, index) => {
    return <ChatProfile chatName={`${user}`} key={index} chatuserclass = {chatuserclass} />;
  });
};


const Chats = ({ Users }) => {
  return (
     <div className="AllCumulativeData">
      <ChatUsers users={Users.Chats} chatuserclass= {Users.ChatClasses.child} />
    </div>

);
};



const AllChats = ({props}) => {
  return (
    <div className="AllChats">
      <div className="UserChatsContainer">
        <div className="ChatTitle">Chats
        </div>
        <Chats Users={props} />
        </div>

      <div className="GroupChatsContainer">
        <div className="ChatTitle">Group Chats
        </div>
        <GroupChats Users={props}  />
      </div>
    </div>
  );
};

export default AllChats;
export{Chats, ChatUsers}


