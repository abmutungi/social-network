import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./posts.css";
library.add(faImage, faXmark);

// All classNames start with cp(short for createpost)
const CreatePost = () => {
  return (
    <div className="cp-container">
      <div className="cp-header">
        <div></div>
        <div className="cp-title">Create post</div>
        <FontAwesomeIcon icon="fa-solid fa-xmark" className="cp-x" />
      </div>
      <div className="cp-pic-name">
        <img className="cp-profile-pic" src="./man-utd.png" alt="img" />
        <div className="cp-name&viewer">
          <div className="cp-name cp-span">Ronald Mcdonald</div>
          <select name="who-can-view" id="who-can-view" className="cp-dropdown">
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>
      <textarea
        className="cp-text-content"
        placeholder="Write Something..."
      ></textarea>
      <div className="cp-add-img">
        <div className="cp-span">Add image to your post</div>
        <FontAwesomeIcon icon="fa-regular fa-image" className="cp-img-icon" />
      </div>
      <button className="cp-button">Post</button>
    </div>
  );
};

export default CreatePost;
