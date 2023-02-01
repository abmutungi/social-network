import "../assets/css/posts.css";
import { useState } from "react";

const DropdownCheckBox = () => {
  const [dropdownDisplay, setDropdownDisplay] = useState(false);

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
        <label htmlFor="1">
          <input type="checkbox" id="1" />
          one
        </label>
        <label htmlFor="2">
          <input type="checkbox" id="2" />
          two
        </label>
        <label htmlFor="3">
          <input type="checkbox" id="3" />
          three
        </label>
      </div>
    </div>
  );
};

export default DropdownCheckBox;
