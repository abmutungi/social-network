import React from "react";
// import ChatProfile from "../components/SingleProfileComponent";
// import "./AllChats.css";
// import GroupChats from "./GroupChats";
// import Users from "../Users/Users";
import { DBData } from "../BodyComponents/BodyComps";
import { SideProfileContainer } from "../components/SideProfileContainer";
// import SingleProfileComponent from "../components/SingleProfileComponent";



/*Key arg in map required, currently using arr index, 
could/should use userID instead */
// const ChatUsers = ({ users, chatuserclass}) => {
//   return users.map((user, index) => {
//     return <SingleProfileComponent chatName={`${user}`} key={index} chatuserclass = {chatuserclass} />;
//   });
// };


// const Chats = ({ Users }) => {
//   return (
//      <div className="AllCumulativeData">
//       <ChatUsers users={Users.Chats} chatuserclass= {Users.ChatClasses.child} />
//     </div>

// );
// };


const AllChats = () => {
  return (
    <div className="AllChats">
     
        <SideProfileContainer parentClass="AllUsers" headers="Chats" data={DBData.AllUsers} childClass={DBData.UsersClasses.child}/>
      

     
        <SideProfileContainer parentClass="AllUsers" headers="Group Chats" data={DBData.GroupChats} childClass={DBData.UsersClasses.child}/>
   
    </div>
  );
};

export default AllChats;
// export{Chats, ChatUsers}


