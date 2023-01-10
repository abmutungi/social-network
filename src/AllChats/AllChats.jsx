import React from "react";
import ChatProfile from "./ChatProfile";
import "./AllChats.css";

const TestUsers = ["Tolu", "Sarmad", "Arnold", "Yonas"];

/*Key arg in map required, currently using arr index, 
could/should use userID instead */
const ChatUsers = ({ users }) => {

  return users.map((user, index) => {
    return <ChatProfile chatName={`${user}`} key={index} />;
  });
};


const UserChats = ({ Users }) => {
  return (
    <div className="UserChats">
      <div className="ChatTitle">Chats</div>
      <ChatUsers users={Users} />
    </div>
  );
};



const AllChats = () => {
  return (
    <div className="AllChats">
      <UserChats Users={TestUsers} />

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
