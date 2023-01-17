import '../../../assets/css/followers.css';

import { MultipleProfilesComponent } from "../../../components/MultipleProfilesComponent";

const Followers = ({ Followers }) => {
  return (
    <div className="followers-container">
      <div className="followers-title">Followers</div>
      <div className="followers-all">
        <MultipleProfilesComponent
          users={Followers.AllUsers}
          chatuserclass={Followers.FollowersClasses.child}
        />
      </div>
    </div>
  );
};

export { Followers };
