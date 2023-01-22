import React, {useState, useEffect,useContext} from "react";
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
import { LowerHeaderContext } from '../../../context/lowerheadercontext';

const ProfileBar = () => {


  const {DBAllUsers, AllGroupsData , userID, updateUserID, GroupID, updateGroupID, updateAboutText } = useContext(LowerHeaderContext);

  const [firstName, setfirstName]= useState('Tolu');
  const [lastName, setlastName]= useState('Lawal');
  const [followers, setfollowers]= useState('10 Followers');
  const [following, setfollowing]= useState('8 Following');


/*
{GroupID: 2, GroupName: '2011 Rashford Fan Club', CreatorID: 2, 
AboutText: Array(1), Members: 2941}

*/
const updateProfileStates = (userid, groupid)=>{
  if(userid>0){
    for (const obj of DBAllUsers) {
      if(obj.UserID ==userid){
        setfirstName(obj.Firstname)
        setlastName(obj.Lastname)
        setfollowers(`${obj.Followers} ${'followers'}`)
        setfollowing(`${obj.Following} ${'following'}`)
        updateAboutText(obj.AboutText)
      }
    }
    updateGroupID(0)
  }else if(GroupID>0){
    for (const obj of AllGroupsData) {
      if(obj.GroupID ==groupid){
        setfirstName(obj.GroupName)
        setlastName("")
        setfollowing(`${obj.Members} ${'members'}`)
        setfollowers('')
        updateAboutText(obj.AboutText)

      }
    }
  }
  updateUserID(0)
}


useEffect(()=>{
  updateProfileStates(userID, GroupID)
     // eslint-disable-next-line react-hooks/exhaustive-deps
},[userID, GroupID])



  // console.log('from profileBar', DBAllUsers);
  //   console.log('profilebarclickuser', userID);


  return (
    <>
      <div className="Profile">
        <div className="ProfilePicContainer">
          <div className="ProfilePic" />
        </div>

        <ProfileInfo
          ProfileName={`${firstName}${' '}${lastName}`}
          Followers={followers}
          Following={following}
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
