import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import "../../../assets/css/posts.css";
import { useState, useContext } from "react";
import DropdownCheckBox from "../../../components/DropdownCheckbox";
library.add(faImage, faXmark);

// All classNames start with cp(short for createpost)
const CreatePostModal = (props) => {
  // set inital states for form inputs
  const [textContent, setTextContent] = useState("");
  const [img, setImg] = useState(null);
  const [privacy, setPrivacy] = useState("public");
  // state for when image is uploaded
  const [imgName, setImgName] = useState("");

  // set state for custom (users) dropdown
  const [dropdown, setDropdown] = useState(false);

  const { LoggedInUserID, updatePosts } = useContext(LowerHeaderContext);

  // for displaying the modal
  if (!props.show) {
    return null;
  }

  // function to handle form submission.
  const handleFormSubmit = (e) => {
    // currently not preventing submit default action as need page to reload after submission.
    // eventually will redirect to home after the create post route is known.
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("imgName", imgName);
    formData.append("userID", LoggedInUserID);

    console.log("form data in obj", Object.fromEntries(formData.entries()));

    fetch("http://localhost:8080/createpost", {
      credentials: "include",
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        updatePosts(data);
      });

    // reset state for inputs on submit
    setTextContent("");
    setImg(null);
    setPrivacy("public");
    setImgName("");
    props.onClose();
  };

  const handleCustomPrivacy = (e) => {
    if (e.target.value === "custom") {
      console.log("custom clicked");
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };

  return (
    <div className="cp-modal" onClick={props.onClose} role="presentation">
      <div
        className="cp-container"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <form style={{ display: "contents" }} onSubmit={handleFormSubmit}>
          <div className="cp-header">
            <div></div>
            <div className="cp-title">Create post</div>
            <FontAwesomeIcon
              onClick={props.onClose}
              icon="fa-solid fa-xmark"
              className="cp-x"
            />
          </div>
          <div className="cp-pic-name">
            <img className="cp-profile-pic" src={props.profileImg} alt="img" />
            <div className="cp-name&viewer">
              <div className="cp-name cp-span">{props.name}</div>
              <div className="cp-dropdowns">
                <select
                  name="privacyOption"
                  id="who-can-view"
                  className="cp-dropdown"
                  value={privacy}
                  onChange={(e) => {
                    setPrivacy(e.target.value);
                    handleCustomPrivacy(e);
                  }}
                >
                  <option name="privacy" value="public">
                    Public
                  </option>
                  <option name="privacy" value="private">
                    Private
                  </option>
                  <option name="privacy" value="custom">
                    Custom
                  </option>
                </select>
                {dropdown && <DropdownCheckBox />}
              </div>
            </div>
          </div>
          <textarea
            required
            className="cp-text-content"
            placeholder="Write Something..."
            type="text"
            name="textContent"
            value={textContent}
            onChange={(e) => {
              setTextContent(e.target.value);
            }}
          ></textarea>
          {img && <span className="cp-img-details">{imgName}</span>}
          <div className="cp-add-img">
            <div className="cp-span">Add image to your post</div>
            <label htmlFor="file-input">
              <FontAwesomeIcon
                icon="fa-regular fa-image"
                className="cp-img-icon"
              />
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setImg(e.target.files[0]);
                setImgName(e.target.files[0].name);
              }}
              name="uploadedPostImg"
            />
          </div>
          <button className="cp-button" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
