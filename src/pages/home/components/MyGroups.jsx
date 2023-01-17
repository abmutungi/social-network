import "../../../assets/css/Groups.css"
import {MultipleProfilesComponent} from '../../../components/MultipleProfilesComponent'

const MyGroups = ({ MyGroups }) => {
    return (
      <div className="myGroups-container">
        <div className="myGroups-title">Groups</div>
        <div className="myGroups-all">
          <MultipleProfilesComponent
            users={MyGroups.Groups}
            chatuserclass={MyGroups.GroupClasses.child}
          />
        </div>
      </div>
    );
  };
  

export {MyGroups}