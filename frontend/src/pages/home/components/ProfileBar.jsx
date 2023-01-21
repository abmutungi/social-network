import React, {useState, useEffect} from "react";
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
import { useContext, usestate } from 'react';

const ProfileBar = () => {


  const { userID } = useContext(LowerHeaderContext);
  const { initialDBData } = useContext(LowerHeaderContext);

  const [firstName, setfirstName]= useState('Tolu');
  const [lastName, setlastName]= useState('Lawal');
  const [followers, setfollowers]= useState(10);
  const [following, setfollowing]= useState(8);


const updateStates = (id)=>{
  if(id>0){
    for (const obj of initialDBData) {
      if(obj.UserID ==id){
        setfirstName(obj.Firstname)
        setlastName(obj.Lastname)
        setfollowers(obj.Followers)
        setfollowing(obj.Following)
      }
    }
  }else{
    return
  }
}


useEffect(()=>{
  updateStates(userID)
  
},[userID])



  console.log('from profileBar', initialDBData);
    console.log('profilebarclickuser', userID);


  return (
    <>
      <div className="Profile">
        <div className="ProfilePicContainer">
          <div className="ProfilePic" />
        </div>

        <ProfileInfo
          ProfileName={`${firstName}${' '}${lastName}`}
          Followers={`${followers} followers`}
          Following={`${following} following`}
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
