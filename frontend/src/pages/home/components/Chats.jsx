import React, { useEffect, useState } from "react";
// import ChatProfile from "../components/SingleProfileComponent";
// import "./AllChats.css";
// import GroupChats from "./GroupChats";
// import Users from "../Users/Users";
import { DBData } from "./BodyComps";
import { SideProfileContainer } from "../../../components/SideProfileContainer";
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
  const [chatUsers, setChatUsers] = useState([]);

  const userForm = new FormData();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")).ID;

  userForm.append("loggedInUserID", loggedInUser);

  async function fetchChatUsers() {
    const resp = await fetch("http://localhost:8080/mychatusers", {
      method: "POST",
      body: userForm,
      credentials: "include",
    });

    const data = await resp.json();

    setChatUsers(data);
  }
  console.log(
    "chat data kjsndfkjsnkdjsndkjsndkfjndskfjsnkdfjnskdf=============> ",
    chatUsers
  );
  useEffect(() => {
    fetchChatUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return users?.map((user, index) => {
  //   return (
  //     <SingleProfileComponent
  //       chatName={`${user.Firstname}`}
  //       id={user.UserID}
  //       key={index}
  //       type={type}
  //     />
  //   );
  // });

  return (
    <div className="AllChats">
      <SideProfileContainer
        parentClass="AllUsers"
        headers="Chats"
        data={chatUsers}
        childClass={DBData.UsersClasses.child}
        type="Chats"
      />

      <SideProfileContainer
        parentClass="AllUsers"
        headers="Group Chats"
        data={DBData.GroupChats}
        childClass={DBData.UsersClasses.child}
        type="GroupChats"
      />
    </div>
  );
};

export default AllChats;
// export{Chats, ChatUsers}
