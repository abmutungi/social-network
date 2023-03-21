import "../../../assets/css/navbar.css";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import {  useContext } from "react";

const NavBar = () => {
  const { updateNavData, updateNavClicked, LoggedInUserID } =
    useContext(LowerHeaderContext);

  function handleClick(data) {
    updateNavClicked(true);
    GetNavBarData(data);
  }

  return (
    <div className="navbar">
      <a className="nav-button" href="/">
        Home
      </a>

      <button
        disabled={LoggedInUserID === 0}
        onClick={() => handleClick("followers")}
        className="nav-button"
      >
        Followers
      </button>
      <button
        disabled={LoggedInUserID === 0}
        onClick={() => handleClick("following")}
        className="nav-button"
      >
        Following
      </button>
      <button
        disabled={LoggedInUserID === 0}
        onClick={() => handleClick("groups")}
        className="nav-button"
      >
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
    updateNavData(data);

    console.log("NAVBAR DATA FROM GO ---- >>  ", data);
  }
};

export default NavBar;
