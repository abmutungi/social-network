
import ChatProfile from "./ChatProfile";
import "./AllChats.css";


const NamedGroupChats = ({ users, chatuserclass}) => {
    return users.map((user, index) => {
      return <ChatProfile chatName={`${user}`} key={index} chatuserclass = {chatuserclass} />;
    });
  };
  
  
  const GroupChats = ({ Users }) => {
    return (
      <div className={Users.GroupChatClasses.parent}>
        <div className="ChatTitle">{Users.Headers.groupchats}</div>
        <div className="AllCumulativeData">

        <NamedGroupChats users={Users.GroupChats} chatuserclass= {Users.GroupChatClasses.child} />
      </div>
      </div>
    );
  };
  

  export default GroupChats