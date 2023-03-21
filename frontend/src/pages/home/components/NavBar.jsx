import "../../../assets/css/navbar.css";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { useState, useContext } from "react";

const NavBar = () => {
  const {
    navFollower,
    navFollowing,
    navGroup,
    updateNavFollower,
    updateNavFollowing,
    updateNavGroup,
    LoggedInUserID,
  } = useContext(LowerHeaderContext);

  return (
    <div className="navbar">
      <a className="nav-button" href="/">
        Home
      </a>

      <button disabled={LoggedInUserID=== 0}onClick={()=>GetNavBarData("followers")} className="nav-button">
        Followers
      </button>
      <button disabled={LoggedInUserID=== 0}onClick={()=>GetNavBarData("following")} className="nav-button">
        Following
      </button>
      <button disabled={LoggedInUserID=== 0}onClick={()=>GetNavBarData("groups")} className="nav-button">
        Groups
      </button>
    </div>
  );

  async function GetNavBarData(type) {
    const navForm = new FormData();
    navForm.append("LIU", LoggedInUserID);
    navForm.append("Type", type);

    const resp = await fetch("http://localhost:8080/getnavdata", {
      method: "POST",
      body: navForm,
    });

    const data = await resp.json();

    console.log("NAVBAR DATA FROM GO ---- >>  ", data);
  }

  // function CanSend(type) {
  //   if (LoggedInUserID > 0) GetNavBarData(type);
  // }
};



export default NavBar;
