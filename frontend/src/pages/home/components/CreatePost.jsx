import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/css/posts.css";
import { useState } from "react";
library.add(faImage, faXmark);

// All classNames start with cp(short for createpost)
const CreatePostModal = (props) => {
  const [formValues, setFormValues] = useState({
    textContent: "",
    imgPath: "",
  });

  // for displaying the modal
  if (!props.show) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  const handleFileSelected = (e) => {
    console.log(e.target.files[0].name);
  };

  const handleChangeAndFileSelected = (e) => {
    handleChange(e);
    handleFileSelected(e);
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
              <select
                name="who-can-view"
                id="who-can-view"
                className="cp-dropdown"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
          <textarea
            className="cp-text-content"
            placeholder="Write Something..."
            type="text"
            name="textContent"
            value={formValues.textContent}
            onChange={handleChange}
          ></textarea>
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
              onChange={handleChangeAndFileSelected}
              name="imgPath"
              value={formValues.imgPath}
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
