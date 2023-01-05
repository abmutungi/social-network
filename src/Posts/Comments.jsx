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
    </div>
  );
};

export default Comments;
