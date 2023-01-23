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
    privacy: "public",
  });

  // state for when image is uploaded
  const [imgUpload, setImgUpload] = useState(null);

  // for displaying the modal
  if (!props.show) {
    return null;
  }

  // function to handle when form inputs are changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // function to handle form submission.
  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    setFormValues("");
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
                name="privacyOption"
                id="who-can-view"
                className="cp-dropdown"
                value={formValues.privacy}
                onChange={handleChange}
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
            </div>
          </div>
          <textarea
            required
            className="cp-text-content"
            placeholder="Write Something..."
            type="text"
            name="textContent"
            value={formValues.textContent}
            onChange={handleChange}
          ></textarea>
          <span className="cp-img-details" value={imgUpload}>
            {formValues.imgPath}
          </span>
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
                formValues.imgPath = e.target.files[0].name;
                const imgFormData = new FormData();
                imgFormData.append("image", e.target.files[0]);
                console.log(
                  Object.fromEntries(imgFormData.entries()),
                  "image form data"
                );

                fetch("http://localhost:8080/img", {
                  mode: "no-cors",
                  method: "POST",
                  body: imgFormData,
                });

                setImgUpload(true);
              }}
              name="imgPath"
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
