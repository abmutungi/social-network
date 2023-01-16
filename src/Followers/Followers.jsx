import './followers.css'
import {NamedUser} from '../Users/Users'

// const Followers=({ Followers })=>{

//     return(
//         <div className="followers-container">
//             <div className="followers-title">Followers
//             </div>
//             <div className='followers-all'>
//                 <div className='follower-each'>
//                     <Users Users={Followers} />
//                 </div>
//             </div>
//         </div>

//     );
// }
const Followers = ({ Followers }) => {
    return (
      
        <div className="followers-container">
                 <div className="followers-title">Followers
            </div>
            <div className='followers-all'>
        <NamedUser users={Followers.Users} chatuserclass= {Followers.FollowersClasses.child} />
        </div>
        </div>

    );
  };
  

export {Followers}