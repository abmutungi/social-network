import { ProfilePostBtn } from "./ProfilePostBtn";
import { PrivateBtn } from "./PrivateBtn";
import React, { useState, useEffect, useContext } from "react";
import ProfileInfo from "./ProfileInfo";
import "../../..//assets/css/ProfileBar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { loggedInUserContext } from "../../../context/loggedInUserContext";
import {
  faLock,
  faUsers,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
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
import { GroupPostBtn } from "./GroupPostBtn";
import { GroupCreateEventBtn } from "./GroupCreateEventBtn";

// import { FetchRelationship } from "../../../components/SingleProfileComponent";
const ProfileBar = () => {
  const {
    DBAllUsers,
    AllGroupsData,
    userID,
     updateUserID,
    GroupID,
    updateGroupID,
    updateAboutText,
    ProfilePhotoBackground,
    LoggedInUserID,
    updatePrivacyStatus,
    PrivacyStatus,
    PrivacyBtnText,
    Following,
    isGroupMember,
    groupNotUser,
    updategroupNotUser
  } = useContext(LowerHeaderContext);
  const { loggedInUser } = useContext(loggedInUserContext);
  console.log("loggedInUser.ID", loggedInUser.ID);
  console.log("current userID", userID);
  const [firstName, setfirstName] = useState(loggedInUser.FName);
  const [lastName, setlastName] = useState(loggedInUser.LName);
  const [followers, setfollowers] = useState("10 Followers");
  const [following, setfollowing] = useState("8 Following");
  //const [groupNotUser, setgroupNotUser] = useState(false);

  /*
{GroupID: 2, GroupName: '2011 Rashford Fan Club', CreatorID: 2, 
AboutText: Array(1), Members: 2941}

*/
  const updateUserProfile = (userid) => {
    updategroupNotUser(false);
    //if (userid > 0) {
    for (const obj of DBAllUsers) {
      if (obj.UserID == userid) {
        setfirstName(obj.Firstname);
        setlastName(obj.Lastname);
        setfollowers(`${obj.Followers} ${"followers"}`);
        setfollowing(`${obj.Following} ${"following"}`);
        updateAboutText(obj.AboutText);
        updatePrivacyStatus(obj.Privacy);
      }
      updateGroupID(0);
    }
    //}
  };

  const updateGroupProfile = (groupid) => {
   // if (GroupID > 0) {
    updategroupNotUser(true);
      for (const obj of AllGroupsData) {
        if (obj.GroupID == groupid) {
          setfirstName(obj.GroupName);
          setlastName("");
          setfollowing(`${obj.Members} ${"members"}`);
          setfollowers("");
          updateAboutText(obj.AboutText);
        }
    //  }
    }
     updateUserID(0);
  };

  useEffect(() => {
    if (userID > 0) updateUserProfile(userID);
    //fetchRelationship(LoggedInUserID, userID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  useEffect(() => {
    if (GroupID > 0) updateGroupProfile(GroupID);
    // fetchRelationship(LoggedInUserID, userID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GroupID]);

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
          {userID === LoggedInUserID && !groupNotUser ? <PrivateBtn /> : null}
          {console.log("PrivacyBtnText****", PrivacyBtnText)}
          {console.log("PrivacyStatus****", PrivacyStatus)}

          {userID === LoggedInUserID && !groupNotUser ? (
            <ProfilePostBtn />
          ) : null}
          {userID !== LoggedInUserID && !groupNotUser ? (
            <UserRequestBtn
              followStatus={Following ? unfollowText : followText}
            />
          ) : null}
          {/* {console.log("**FOLOWING IS**", Following)} */}
          <ProfileEventBtn />
          {groupNotUser && !isGroupMember? (
            <GroupRequestBtn requestJoin={"Join"} requestSent={"Requested"} />
          ) : null}
          {console.log(LoggedInUserID)}
          {userID != LoggedInUserID && !groupNotUser ? (
            <StaticBtn status={!PrivacyStatus ? "Public" : "Private"} />
          ) : null}
          {groupNotUser && isGroupMember ? <GroupInviteBtn /> : null}
          {groupNotUser && isGroupMember ? <GroupPostBtn /> : null}
          {groupNotUser && isGroupMember ? <GroupCreateEventBtn /> : null}

      
        </div>
      </div>
    </>
  );
};

export default ProfileBar;
