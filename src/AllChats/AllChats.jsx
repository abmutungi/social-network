import React from "react";
import ChatProfile from "./ChatProfile";
import "./AllChats.css";

//const TestUsers = ["Tolu", "Sarmad", "Arnold", "Yonas"];

/*Key arg in map required, currently using arr index, 
could/should use userID instead */
const ChatUsers = ({ users, chatuserclass}) => {
  console.log('sugh', chatuserclass);
  

  return users.map((user, index) => {
    return <ChatProfile chatName={`${user}`} key={index} chatuserclass = {chatuserclass} />;
  });
};


const UserChats = ({ Users }) => {
  return (
    <div className={Users.ChatClasses.parent}>
      <div className="ChatTitle">Chats</div>
      <ChatUsers users={Users.TestUsers} chatuserclass= {Users.ChatClasses.child} />
    </div>
  );
};



const AllChats = ({props}) => {
  return (
    <div className="AllChats">
      <UserChats Users={props} />

      <div className="UserChats">
        <div className="ChatTitle">Group Chats</div>
        <ChatProfile chatName={"test1"} />
        <ChatProfile chatName={"test2"} />
        <ChatProfile chatName={"test3"} />
        <ChatProfile chatName={"test4"} />
      </div>
    </div>
  );
};

export default AllChats;
