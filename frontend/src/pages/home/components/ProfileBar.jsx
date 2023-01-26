import { ProfilePostBtn } from "./ProfilePostBtn";
import { PrivateBtn } from "./PrivateBtn";
import React, { useState, useEffect, useContext } from "react";
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
import {
  followText,
  unfollowText,
  UserRequestBtn,
} from "../../../components/UserRequestBtn";
library.add(faCirclePlus, faUserGroup, faLock, faUsers);
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { ProfilePhoto } from "./ProfilePhoto";
import { ProfileEventBtn } from "./ProfileEventBtn";
import { GroupRequestBtn } from "./GroupRequestBtn";
import { StaticBtn } from "./StaticBtn";
import { GroupInviteBtn } from "./GroupInviteBtn";
import { FetchRelationship } from "../../../components/SingleProfileComponent";
const ProfileBar = () =>
  // pbPrivacyBtn,
  // pbPostBtn,
  // pbFollowBtn,
  // pbInviteBtn
  {
    const {
      DBAllUsers,
      // AllGroupsData,
      userID,
      // updateUserID,
      // GroupID,
      // updateGroupID,
      updateAboutText,
      ProfilePhotoBackground,
      LoggedInUserID,
      updatePrivacyStatus,
      PrivacyStatus,
      Following,
    } = useContext(LowerHeaderContext);

    const [firstName, setfirstName] = useState("Tolu");
    const [lastName, setlastName] = useState("Lawal");
    const [followers, setfollowers] = useState("10 Followers");
    const [following, setfollowing] = useState("8 Following");

    /*
{GroupID: 2, GroupName: '2011 Rashford Fan Club', CreatorID: 2, 
AboutText: Array(1), Members: 2941}

*/
    const updateProfileStates = (userid) => {
      // let profObj = {}
      if (userid > 0) {
        for (const obj of DBAllUsers) {
          console.log(obj);
          if (obj.UserID == userid) {
            setfirstName(obj.Firstname);
            setlastName(obj.Lastname);
            setfollowers(`${obj.Followers} ${"followers"}`);
            setfollowing(`${obj.Following} ${"following"}`);
            updateAboutText(obj.AboutText);
            updatePrivacyStatus(obj.Privacy);
          }
        }
        // updateGroupID(0);
        // } else if (GroupID > 0) {
        //   for (const obj of AllGroupsData) {
        //     if (obj.GroupID == groupid) {
        //       setfirstName(obj.GroupName);
        //       setlastName("");
        //       setfollowing(`${obj.Members} ${"members"}`);
        //       setfollowers("");
        //       updateAboutText(obj.AboutText);
        //     }
        //   }
      }
      // updateUserID(0);
    };

    useEffect(() => {
      updateProfileStates(userID);
      FetchRelationship(LoggedInUserID, userID);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID]);
    // console.log('from profileBar', DBAllUsers);
    //   console.log('profilebarclickuser', userID);

    // useEffect(() => {
    //   updateProfileStates(0, GroupID);

    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [GroupID]);

    return (
      <>
        <div className="Profile">
          <div className="ProfilePicContainer">
            {/* <div className="ProfilePic" /> */}
          </div>
          <ProfilePhoto background={ProfilePhotoBackground} />

          <ProfileInfo
            ProfileName={`${firstName}${" "}${lastName}`}
            Followers={followers}
            Following={following}
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
            <ProfilePostBtn />
            {userID != LoggedInUserID ? (
              <UserRequestBtn
                isPublic={true}
                followStatus={!Following ? followText : unfollowText}
              />
            ) : null}
            {console.log("********FOLLOWING**************", Following)}
            <ProfileEventBtn />
            <GroupRequestBtn requestJoin={"Join"} requestSent={"Requested"} />
            {console.log(PrivacyStatus)}
            {userID != LoggedInUserID ? (
              <StaticBtn status={!PrivacyStatus ? "Public" : "Private"} />
            ) : null}
            <GroupInviteBtn />
          </div>
        </div>
      </>
    );
  };

export default ProfileBar;
