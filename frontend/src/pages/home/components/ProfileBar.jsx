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
import { useContext } from 'react';

const ProfileBar = () => {


  const { userID } = useContext(LowerHeaderContext);

  
    console.log('propsclickuser', userID);
    
    useEffect (()=>{
      let i =1
      console.log('from loop', i, userID);
    

    },[userID])





  // const[profileHeader, setProfileHeader] = useState({name:"Tolu Lawal", followers:"10", following:"8", userID: 1});

  // async function fetchProfileHeader(){
  //   try{
  // const response = await fetch("http://localhost:8080/dummyusers");
  // const data = await response.json();
  // setUsers(data)
  
  // console.log('user data received', data);
  //   }catch(e){
  //     console.log('Error fetching users', e);
  //   }
  
  
  // }
  //console.log('check users post fetch', users)
  
  // useEffect(()=>{
  //   fetchUsers()
  // },[])


  return (
    <>
      <div className="Profile">
        <div className="ProfilePicContainer">
          <div className="ProfilePic" />
        </div>

        <ProfileInfo
          ProfileName="Arnold Mutungi"
          Followers={userID}
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
