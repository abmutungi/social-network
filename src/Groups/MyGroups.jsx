import "./Groups.css";
import {NamedGroup} from "./Groups";


const MyGroups = ({ MyGroups }) => {
    return (
      
        <div className="myGroups-container">
                 <div className="myGroups-title">Groups
            </div>
            <div className='myGroups-all'>
        <NamedGroup groups={MyGroups.Groups} groupclass= {MyGroups.GroupClasses.child} />
        </div>
        </div>

    );
  };
  

export {MyGroups}