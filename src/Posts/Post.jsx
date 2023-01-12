import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import "./posts.css";
import Comments from "./Comments";
library.add(faThumbsUp, faMessage);

// SinglePost takes the props that come from the database
const SinglePost = ({ postObj }) => {
  return (
    <div className="post-container">
      <div className="cp-pic-name">
        <img className="cp-profile-pic" src={postObj.imgPath} alt="img" />
        <div className="cp-name&viewer">
          <div className="cp-name cp-span">{postObj.name}</div>
          <span className="date">{postObj.date}</span>
        </div>
      </div>
      <span className="post-text-span">{postObj.textContent}</span>
      {/* this is where the image will go if there is one (<img src="./romero.png" alt="img" className="post-uploaded-img" />) */}
      <div className="post-details">
        <button className="show-comments-button">
          {postObj.commentsCount} comments
        </button>
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
      <Comments />
    </div>
  );
};

// PostsContiner will map through the posts data from the database and fill up the container with the posts.
const PostsContainer = () => {
  return (
    <div className="posts-container">
      <SinglePost
        postObj={{
          imgPath: "./Posts/man-utd.png",
          name: "Lisandro Martinez",
          date: "01/01/23",
          textContent: "Yooo not like that",
          commentsCount: "100",
        }}
      />
      <SinglePost
        postObj={{
          imgPath: "./Posts/man-utd.png",
          name: "Lisandro Martinez",
          date: "01/01/23",
          textContent: "Yooo not like that",
          commentsCount: "100",
        }}
      />
      <SinglePost
        postObj={{
          imgPath: "./Posts/man-utd.png",
          name: "Lisandro Martinez",
          date: "01/01/23",
          textContent: "Yooo not like that",
          commentsCount: "100",
        }}
      />
       <SinglePost
        postObj={{
          imgPath: "./Posts/man-utd.png",
          name: "Lisandro Martinez",
          date: "01/01/23",
          textContent: "Yooo not like that",
          commentsCount: "100",
        }}
      /> <SinglePost
      postObj={{
        imgPath: "./Posts/man-utd.png",
        name: "Lisandro Martinez",
        date: "01/01/23",
        textContent: "Yooo not like that",
        commentsCount: "100",
      }}
    />
    </div>
  );
};

export default PostsContainer;
