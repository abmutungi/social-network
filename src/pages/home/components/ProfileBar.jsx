import React from "react";
import { ProfileBtn, PrivateBtn } from "./ProfileBtn";
import ProfileInfo from "./ProfileInfo";
import "../../..//assets/css/ProfileBar.css"
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCirclePlus, faLock, faUsers);

const ProfileBar = () => {
  return (
    <>
      <div className="Profile">
        <div className="ProfilePicContainer">
          <div className="ProfilePic" />
        </div>

        <ProfileInfo
          ProfileName="Arnold Mutungi"
          Followers="1k followers"
          Following="1.1k following"
        />
        <div className="ProfileBtnContainer">
          <PrivateBtn
            OptionA={<FontAwesomeIcon icon="fa-solid fa-lock" />}
            OptionB={<FontAwesomeIcon icon="fa-solid fa-users" />}
          />
          <ProfileBtn
            btnName={<FontAwesomeIcon icon="fa-solid fa-circle-plus" />}
            className={"add-post-btn"}
          />
        </div>
      </div>
    </>
  );
};
export default ProfileBar;
