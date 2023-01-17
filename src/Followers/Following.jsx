import { MultipleProfilesComponent } from '../components/MultipleProfilesComponent';
import './followers.css'
// import { NamedUser } from '../Users/Users';

// const Following=({ Following })=>{

//     return(
//         <div className="followers-container">
//             <div className="followers-title">Following
//             </div>
//             <div className='followers-all'>
//                 <div className='follower-each'>
//                     <Users Users={Following} />
//                 </div>
//             </div>
//         </div>

//     );
// }


const Following = ({ Following }) => {
    return (
      
        <div className="followers-container">
                 <div className="followers-title">Following
            </div>
            <div className='followers-all'>
        <MultipleProfilesComponent users={Following.AllUsers} chatuserclass= {Following.FollowersClasses.child} />
        </div>
        </div>

    );
  };
  

export {Following}