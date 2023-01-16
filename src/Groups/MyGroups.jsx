import "./Groups.css";
import {NamedGroup} from "./Groups";

// const MyGroups=({ MyGroups })=>{

//     return(
//         <div className="myGroups-container">
//             <div className="myGroups-title">My Groups
//             </div>
//             <div className='myGroups-all'>
//                 <div className='myGroup-each'>
//                     <Groups Users={MyGroups} />
//                 </div>
//             </div>
//         </div>

//     );
// }

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