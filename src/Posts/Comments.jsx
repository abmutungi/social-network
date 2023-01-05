const Comments = () => {
  return (
    <div className="comments-container">
      <div className="write-comment">
        <img
          className="cp-profile-pic comment-profile-pic"
          src="./Posts/man-utd.png"
          alt="img"
        />
        <textarea
          className="comment-input"
          placeholder="Write a comment..."
          rows={1}
        ></textarea>
      </div>
      <div className="single-comment">
        <img
          className="cp-profile-pic comment-profile-pic"
          src="./Posts/man-utd.png"
          alt="img"
        />
        <div className="comment">
          <div className="comment-bubble">
            <div className="comment-name">username</div>
            <span className="comment-span">
              Hello there this is text to fill comment, lets make the comment
              longer to see what happens, what if we add more text?
            </span>
          </div>
          <div className="comment-date">01/01</div>
        </div>
      </div>{" "}
      <div className="single-comment">
        <img
          className="cp-profile-pic comment-profile-pic"
          src="./Posts/man-utd.png"
          alt="img"
        />
        <div className="comment">
          <div className="comment-bubble">
            <div className="comment-name">username</div>
            <span className="comment-span">shorter comment</span>
          </div>
          <div className="comment-date">01/01</div>
        </div>
      </div>{" "}
      <div className="single-comment">
        <img
          className="cp-profile-pic comment-profile-pic"
          src="./Posts/man-utd.png"
          alt="img"
        />
        <div className="comment">
          <div className="comment-bubble">
            <div className="comment-name">username</div>
            <span className="comment-span">
              Hello there this is text to fill comment, lets make the comment
              longer to see what happens, what if we add more text?
            </span>
          </div>
          <div className="comment-date">01/01</div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
