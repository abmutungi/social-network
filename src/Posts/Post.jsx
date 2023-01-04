import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import "./posts.css";
library.add(faThumbsUp, faMessage);

const Post = () => {
  return (
    <div className="post-container">
      <div className="cp-pic-name">
        <img className="cp-profile-pic" src="./Posts/man-utd.png" alt="img" />
        <div className="cp-name&viewer">
          <div className="cp-name cp-span">Lisandro Martinez</div>
          <span className="date">25 December at 12pm</span>
        </div>
      </div>
      <span className="post-text-span">Bro...not like that!</span>
      {/* this is where the image will go if there is one (<img src="./romero.png" alt="img" className="post-uploaded-img" />) */}
      <div className="post-details">
        <button className="show-comments-button">100 comments</button>
      </div>
      <div className="post-actions">
        <button className="post-action-button">
          <FontAwesomeIcon
            icon="fa-regular fa-thumbs-up"
            className="post-icon"
          />
          <span>Like</span>
        </button>
        <button className="post-action-button">
          <FontAwesomeIcon icon="fa-regular fa-message" className="post-icon" />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
