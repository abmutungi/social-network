import ChatProfile from "../AllChats/ChatProfile";
import "./Users.css";


const NamedUser = ({ users, chatuserclass}) => {
    return users.map((user, index) => {
      return <ChatProfile chatName={`${user}`} key={index} chatuserclass = {chatuserclass} />;
    });
  };
  
  
  const Users = ({ Users }) => {
    return (
      
        <div className="AllCumulativeData">
        <NamedUser users={Users.Users} chatuserclass= {Users.UsersClasses.child} />
        </div>
      
    );
  };
  

  export{ NamedUser, Users}
  export default Users