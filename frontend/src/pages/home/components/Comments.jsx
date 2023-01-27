import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faImage);

// This component returns a single comment.
const SingleComment = ({ commentData }) => {
  return (
    <div className="single-comment">
      <img
        className="cp-profile-pic comment-profile-pic"
        src={commentData.imgPath}
        alt="img"
      />
      <div className="comment">
        <div className="comment-bubble">
          <div className="comment-name">{commentData.name}</div>
          <span className="comment-span">{commentData.content}</span>
        </div>
        <div className="comment-date">{commentData.date}</div>
      </div>
    </div>
  );
};

// This is the comments container that will hold comment input and many single comments passed into it.

const Comments = (props) => {
  // state for comment input
  const [commentInput, setCommentInput] = useState("");

  // function to handle form submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    formData.append("postID", props.postID);

    const commentJson = Object.fromEntries(formData.entries());
    console.log(commentJson);
    fetch("http://localhost:8080/storecomment", {
      mode: "no-cors",
      method: "POST",
      body: formData,
    });
    setCommentInput("");
  };

  return (
    <>
      <div className="comments-container">
        <div className="write-comment">
          <img
            className="cp-profile-pic comment-profile-pic"
            src="../assets/img/ext/man-utd.png"
            alt="img"
          />
          <form
            className="comment-form"
            onSubmit={handleCommentSubmit}
            role="presentation"
          >
            <input
              name="textContent"
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
              className="comment-input"
              placeholder="Write a comment..."
              rows={1}
            ></input>
            <button className="comment-upload-btn">
              <FontAwesomeIcon icon="fa-solid fa-image" />
            </button>
          </form>
        </div>
        {/* map through passed down comments for each post */}
        {props.comments?.map((comment) => (
          <SingleComment
            key={comment.commentID}
            commentData={{
              name: comment.name,
              content: comment.textContent,
              date: comment.date,
              imgPath: comment.imgPath,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
