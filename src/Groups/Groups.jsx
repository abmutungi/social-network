import ChatProfile from "../AllChats/ChatProfile";
import "./Groups.css";


const NamedGroup = ({ groups, groupclass}) => {
  
    return groups.map((user, index) => {
      return <ChatProfile chatName={`${user}`} key={index} chatuserclass = {groupclass} />;
    });
  };
  
  
  const Groups = ({ Users }) => {
    return (
      <div className={Users.GroupClasses.parent}>
        <div className="ChatTitle">{Users.Headers.Groups}</div>
        <div className="AllCumulativeData">

        <NamedGroup groups={Users.Groups} groupclass= {Users.GroupClasses.child} />
        </div>
      </div>
    );
  };
  

  export default Groups