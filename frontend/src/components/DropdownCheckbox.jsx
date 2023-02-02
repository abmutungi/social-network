import "../assets/css/posts.css";
import { useState } from "react";

const DropdownCheckBox = (props) => {
  const [dropdownDisplay, setDropdownDisplay] = useState(false);

  //   const [followers, setFollowers] = useState([]);

  //   props.followersFromParent.map((follower) => {
  //     console.log(follower.UserID);
  //   });
  const handleDropDownDisplay = () => {
    const checkboxContainer = document.querySelector(".checkboxes");
    if (!dropdownDisplay) {
      checkboxContainer.style.display = "block";
      setDropdownDisplay(true);
    } else {
      checkboxContainer.style.display = "none";
      setDropdownDisplay(false);
    }
  };

  return (
    <div className="cb-container">
      <div
        className="select-box"
        onClick={handleDropDownDisplay}
        role="presentation"
      >
        <select name="" id="">
          <option>Select followers</option>
        </select>
        <div className="over-select"></div>
      </div>
      <div className="checkboxes">
        {props.followersFromParent?.map((follower) => (
          <label htmlFor={follower.UserID} key={follower.UserID}>
            <input type="checkbox" id={follower.UserID} />
            {follower.Firstname}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownCheckBox;
