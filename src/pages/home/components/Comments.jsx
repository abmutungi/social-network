// This component returns a single comment.

const SingleComment = ({ commentObj }) => {
  return (
    <div className="single-comment">
      <img
        className="cp-profile-pic comment-profile-pic"
        src={commentObj.imgPath}
        alt="img"
      />
      <div className="comment">
        <div className="comment-bubble">
          <div className="comment-name">{commentObj.name}</div>
          <span className="comment-span">{commentObj.content}</span>
        </div>
        <div className="comment-date">{commentObj.date}</div>
      </div>
    </div>
  );
};

// This is the comments container that will hold comment input and many single comments passed into it.

const Comments = () => {
  return (
    <>
      <div className="comments-container">
        <div className="write-comment">
          <img
            className="cp-profile-pic comment-profile-pic"
            src="../assets/img/ext/man-utd.png"
            alt="img"
          />
          <textarea
            className="comment-input"
            placeholder="Write a comment..."
            rows={1}
          ></textarea>
        </div>
        <SingleComment
          commentObj={{
            imgPath: "../assets/img/ext/man-utd.png",
            name: "Wout Weghourst",
            content:
              "yoyo about to sign for united kjndkwjndkwjendkwjdnkwejndkwjdnkwejn kfjrnkfjernkfjenkfjnerrkfjnerkfjnekr fjernkfjenrkfjenfkjenrfkejrnfrkejrnf jenkdjwnkdjnkwedjnwkejdnwkdjn diwoeidwoiednowiden",
            date: "01/01",
          }}
        />
        <SingleComment
          commentObj={{
            imgPath: "../assets/img/ext/man-utd.png",
            name: "test",
            content: "ok then",
            date: "01/01",
          }}
        />
      </div>
    </>
  );
};

export default Comments;
