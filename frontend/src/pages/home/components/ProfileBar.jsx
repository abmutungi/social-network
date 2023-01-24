import React from "react";
import { ProfilePostBtn, PrivateBtn } from "./ProfilePostBtn";
import ProfileInfo from "./ProfileInfo";
import "../../..//assets/css/ProfileBar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { followText, UserRequestBtn } from "../../../components/UserRequestBtn";
library.add(faCirclePlus, faUserGroup, faLock, faUsers);

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
            className="privacy-btn"
            OptionA={
              <>
                <FontAwesomeIcon icon="fa-solid fa-lock" />
                <span className="icon-text">Private</span>
              </>
            }
            OptionB={
              <>
                <FontAwesomeIcon icon="fa-solid fa-users" />
                <span className="icon-text">Public</span>
              </>
            }
          />
          <ProfilePostBtn
            btnName={
              <>
                <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                <span className="icon-text">Post</span>
              </>
            }
            className={"add-post-btn"}
          />
          <UserRequestBtn isPublic={false} followStatus={followText} />
        </div>
      </div>
    </>
  );
};

export default ProfileBar;
