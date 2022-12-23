import React from "react";
import { ProfileBtn, PrivateBtn } from "./ProfileBtn";
import ProfileInfo from "./ProfileInfo";
import "./ProfileBar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faLock, faUsers, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCirclePlus, faLock, faUsers);

const ProfileBar = () => {
    return (
        <div className="Profile">
            <a className="ProfilePic" href="https://www.facebook.com/">
                <img
                    src="https://www.facebook.com/images/fb_icon_325x325.png"
                    width="106"
                    height="106"
                    alt="profile-pic"
                />
            </a>
            <ProfileInfo
                ProfileName="Arnold Mutungi"
                Followers="1k followers"
                Following="1.1k following"
            />
            <PrivateBtn
                OptionA={<FontAwesomeIcon icon="fa-solid fa-lock" />}
                OptionB={<FontAwesomeIcon icon="fa-solid fa-users" />}
            />
            <ProfileBtn
                btnName={<FontAwesomeIcon icon="fa-solid fa-circle-plus" />}
            />
        </div>
    );
};
export default ProfileBar;
