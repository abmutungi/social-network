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
  joinText,
  requestText,
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
    updateNickname,
    updateDOB,
    updateEmail,
    ProfilePhotoBackground,
    LoggedInUserID,
    updatePrivacyStatus,
    PrivacyStatus,
    GroupRequested,
    Following,
    isGroupMember,
    groupNotUser,
    updategroupNotUser,
    updateProfilePhotoBackground,
  } = useContext(LowerHeaderContext);
  const { loggedInUser } = useContext(loggedInUserContext);


  const [firstName, setfirstName] = useState(loggedInUser.FName);
  const [lastName, setlastName] = useState(loggedInUser.LName);
  const [followers, setfollowers] = useState();
  const [following, setfollowing] = useState();

  async function GetFollowerCount(userid, type) {
    const navForm = new FormData();
    navForm.append("LIU", userid);
    navForm.append("Type", type);

    const resp = await fetch("http://localhost:8080/getnavdata", {
      method: "POST",
      body: navForm,
    });

    const data = await resp.json();

    let count = getFollowCount(data)
    let  text = count > 1 ? count + ' followers' : ''
    setfollowers(text)
   

  }


  async function GetFollowingCount(userid, type) {
    const navForm = new FormData();
    navForm.append("LIU", userid);
    navForm.append("Type", type);

    const resp = await fetch("http://localhost:8080/getnavdata", {
      method: "POST",
      body: navForm,
    });

    const data = await resp.json();
    let fcount = getFollowCount(data)
    let ftext = fcount > 1 ? fcount + ' following':''
    setfollowing(ftext )
   // data.length >0 ?  setfollowing(data.length) : setfollowing('0 Following')

  }



  const updateUserProfile = (userid) => {
    updategroupNotUser(false);

    for (const obj of DBAllUsers) {
      if (obj.UserID == userid) {
        console.log('FROM LOOP--->', obj);
        setfirstName(obj.Firstname);
        setlastName(obj.Lastname);
        updateEmail(obj.Email);
        // setfollowers(`${obj.Followers} ${"followers"}`);
        // setfollowing(`${obj.Following} ${"following"}`);
        updateAboutText(obj.AboutText);
        updateNickname(obj.Nickname);
        updateDOB(obj.DOB);
        updatePrivacyStatus(obj.Privacy);
        obj.Avatar != ""
          ? updateProfilePhotoBackground(obj.Avatar)
          : updateProfilePhotoBackground("userdefaulttwo.png");
      }
      updateGroupID(0);
    }
    //}
  };

  const GroupMembers = () => {
    
    const members = AllGroupsData.filter((count) => count.GroupID == GroupID)

    let groupMemberText = members[0].Members + ' members'
    return groupMemberText
    

  

  }
  const updateGroupProfile = (groupid) => {
    updategroupNotUser(true);
    for (const obj of AllGroupsData) { 
      if (obj.GroupID == groupid) {
        setfirstName(obj.GroupName);
        setlastName("");
        
      obj.Avatar != ""
          ? updateProfilePhotoBackground(obj.Avatar) 
          : updateProfilePhotoBackground("creategroupposticonone.png");
        updateAboutText(obj.AboutText);
        
      }
     
    }
    updateUserID(0);
  };

  useEffect(() => {
    GetFollowerCount(userID,'followers')
    GetFollowingCount(userID, 'following')
    
    if (userID > 0) updateUserProfile(userID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);


  useEffect(() => {

    if (GroupID > 0) {
      updateGroupProfile(GroupID);
      
    }
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
          Following={ !groupNotUser ? following : GroupMembers()}
        />
        <div className="ProfileBtnContainer">
          {userID === LoggedInUserID && !groupNotUser ? <PrivateBtn /> : null}
      

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
          {groupNotUser && !isGroupMember ? (
            <GroupRequestBtn hasRequested={GroupRequested ? requestText : joinText}/>
          ) : null}
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

const getFollowCount = (arr)=>{
  
  if(arr == null||arr == undefined) {
    return 0
  }
  return arr.length

}

export default ProfileBar;
