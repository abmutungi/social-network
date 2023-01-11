
import ChatProfile from "./ChatProfile";
import "./AllChats.css";


const NamedGroupChats = ({ users, chatuserclass}) => {
    console.log('sugh', chatuserclass);
    return users.map((user, index) => {
      return <ChatProfile chatName={`${user}`} key={index} chatuserclass = {chatuserclass} />;
    });
  };
  
  
  const GroupChats = ({ Users }) => {
    console.log('-GChats---', Users);
    return (
      <div className={Users.GroupChatClasses.parent}>
        <div className="ChatTitle">{Users.Headers.groupchats}</div>
        <NamedGroupChats users={Users.GroupChats} chatuserclass= {Users.GroupChatClasses.child} />
      </div>
    );
  };
  

  export default GroupChats