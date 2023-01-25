import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import "../../../assets/css/posts.css";
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
  // set initial state for posts
  const [posts, setPosts] = useState([]);

  // fetch home posts for the logged in user
  const userForm = new FormData();

  // the user id would have to be taken from somewhere (contet data for user)
  userForm.append("userID", "1");

  async function fetchPosts() {
    const resp = await fetch("http://localhost:8080/myposts", {
      method: "POST",
      body: userForm,
    });

    const data = await resp.json();
    setPosts(data);
  }

  // make a network request on component render.
  useEffect(() => {
    fetchPosts();
  });

  return (
    <>
      <div className="posts-container">
        {posts.map((post) => (
          <SinglePost
            key={post.postID}
            postObj={{
              imgPath: "../assets/img/ext/man-utd.png",
              name: "Casemiro",
              date: post.createdAt,
              textContent: post.textContent,
              commentsCount: 100,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default PostsContainer;
