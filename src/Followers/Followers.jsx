import './followers.css'
import {NamedUser} from '../Users/Users'




const Followers = ({ Followers }) => {
    return (
      
        <div className="followers-container">
                 <div className="followers-title">Followers
            </div>
            <div className='followers-all'>
        <NamedUser users={Followers.AllUsers} chatuserclass= {Followers.FollowersClasses.child} />
        </div>
        </div>

    );
  };
  

export {Followers}