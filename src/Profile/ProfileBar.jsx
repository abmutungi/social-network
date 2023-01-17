import React from "react";
import { ProfileBtn, PrivateBtn } from "./ProfileBtn";
import ProfileInfo from "./ProfileInfo";
import "./ProfileBar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatePostModal from "../Posts/CreatePost";
import { useState } from "react";
library.add(faCirclePlus, faLock, faUsers);

const ProfileBar = () => {
  const [show, setShow] = useState(false);
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
            btnName={
              <FontAwesomeIcon
                onClick={() => setShow(true)}
                icon="fa-solid fa-circle-plus"
              />
            }
            className={"add-post-btn"}
          />
        </div>
      </div>
      <CreatePostModal
        name="Bruno"
        profileImg="./Posts/man-utd.png"
        onClose={() => setShow(false)}
        show={show}
      />
    </>
  );
};
export default ProfileBar;
