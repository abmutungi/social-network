import ChatProfile from "../AllChats/ChatProfile";
import "./Groups.css";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCirclePlus, faLock, faUsers);

const NamedGroup = ({ groups, groupclass}) => {
  
    return groups.map((user, index) => {
      return <ChatProfile chatName={`${user}`} key={index} chatuserclass = {groupclass} />;
    });
  };
  
  
  const Groups = ({ Users }) => {
    return (
     
        <div className="AllCumulativeData">

        <NamedGroup groups={Users.Groups} groupclass= {Users.GroupClasses.child} />
        </div>
    );
  };
  
export {NamedGroup}
export default Groups