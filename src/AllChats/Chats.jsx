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
    <div className={Users.ChatClasses.parent}>
      <div className="ChatTitle">{Users.Headers.chats}</div>
      <div className="AllCumulativeData">
      <ChatUsers users={Users.Chats} chatuserclass= {Users.ChatClasses.child} />
    </div>
    </div>
  );
};



const AllChats = ({props}) => {
  return (
    <div className="AllChats">
      <Chats Users={props} />
      <GroupChats Users={props}  />
    </div>
  );
};

export default AllChats;
export{Chats, ChatUsers}

