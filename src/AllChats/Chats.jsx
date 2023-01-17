import React from "react";
import ChatProfile from "./ChatProfile";
import "./AllChats.css";
import GroupChats from "./GroupChats";
import Users from "../Users/Users";
import { DBData } from "../BodyComponents/BodyComps";




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


/*
        <Users parentClass="AllGroups" headers="Groups" data= {DBData.Groups} childClass={DBData.GroupClasses.child}/>

                <Users parentClass="AllChats" headers="Chats" data= {DBData.Chats} childClass={DBData.GroupClasses.child}/>

  */

const AllChats = () => {
  return (
    <div className="AllChats">
     
        <Users parentClass="AllUsers" headers="Chats" data={DBData.AllUsers} childClass={DBData.UsersClasses.child}/>
      

     
        <Users parentClass="AllUsers" headers="Users" data={DBData.GroupChats} childClass={DBData.UsersClasses.child}/>
   
    </div>
  );
};

export default AllChats;
export{Chats, ChatUsers}


