import { MultipleProfilesComponent } from "../../../components/MultipleProfilesComponent";
import "../../../assets/css/followers.css";
// let followBtn = document.getElementsByClassName(".followIcon");

const Following = ({ Following }) => {
  return (
    <div className="followers-container">
      <div className="followers-title">Following</div>
      <div className="followers-all">
        <MultipleProfilesComponent
          users={Following.AllUsers}
          chatuserclass={Following.FollowersClasses.child}
        />
      </div>
    </div>
  );
};

// followBtn.addEventListener("click", () => {
//   console.log("clicked");
// });


export { Following };
