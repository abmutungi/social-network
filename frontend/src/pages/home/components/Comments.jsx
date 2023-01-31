import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
library.add(faImage);

// This component returns a single comment.
const SingleComment = (props) => {
  // if there is an image add the img div
  const imageExists = props.commentImage;
  return (
    <div className="single-comment">
      <img
        className="cp-profile-pic comment-profile-pic"
        src={props.imgPath}
        alt="img"
      />
      <div className="comment">
        <div className="comment-bubble">
          <div className="comment-name">{props.name}</div>
          <span className="comment-span">{props.content}</span>
        </div>
        {imageExists && (
          <img className="comment-img" src={props.commentImage} alt="img" />
        )}
        <div className="comment-date">{props.date}</div>
      </div>
    </div>
  );
};

// This is the comments container that will hold comment input and many single comments passed into it.

const Comments = (props) => {
  // state for comment input
  const [commentInput, setCommentInput] = useState("");
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState("");
  const { updatePosts, DynamicID } = useContext(LowerHeaderContext);
  // function to handle form submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const form = e.target.form;
    const formData = new FormData(form);
    formData.append("postID", props.postID);
    formData.append("imgName", imgName);
    formData.append("userID", DynamicID);
    // const commentJson = Object.fromEntries(formData.entries());
    // console.log(commentJson);
    fetch("http://localhost:8080/storecomment", {
      credentials: "include",
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updatePosts(data);
      });
    setCommentInput("");
    setImg(null);
  };

  // submit comment form on enter key being pressed
  const submitOnEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return handleCommentSubmit(e);
    }
  };

  // if there is no image return "" else return img path as prop
  const handlePostImgPath = (strImgPath) => {
    return strImgPath === "" ? "" : `../assets/img/ext/${strImgPath}`;
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
          <form className="comment-form" role="presentation">
            <textarea
              name="textContent"
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
              className="comment-input"
              placeholder="Write a comment..."
              rows={1}
              onKeyDown={submitOnEnter}
            />
            {img && <span className="cp-img-details">{imgName}</span>}
            <label
              htmlFor="file-upl"
              type="button"
              className="comment-upload-btn"
            >
              <FontAwesomeIcon icon="fa-solid fa-image" />
            </label>
            <input
              id="file-upl"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setImg(e.target.files[0]);
                setImgName(e.target.files[0].name);
              }}
              name="uploadedCommentImg"
            />
          </form>
        </div>
        {/* map through passed down comments for each post */}
        {props.comments?.map((comment) => (
          <SingleComment
            key={comment.commentID}
            name={comment.name}
            content={comment.textContent}
            date={comment.date}
            commentImage={handlePostImgPath(comment.imageContent)}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
