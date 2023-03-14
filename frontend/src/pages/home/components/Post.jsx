import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { useEffect, useContext } from "react";
import "../../../assets/css/posts.css";
import Comments from "./Comments";
import EventBanner from "./EventBanner";

library.add(faThumbsUp, faMessage);

// SinglePost takes the props that come from the database
const SinglePost = (props) => {
  // if there is an image add the img div
  const imageExists = props.postImg;

  // comments passed down from posts component
  const commentsToPass = props.commentsArray;
  return (
    <div className="post-container">
      <div className="cp-pic-name">
        <img className="cp-profile-pic" src={props.profileImgPath} alt="img" />
        <div className="cp-name&viewer">
          <div className="cp-name cp-span">{props.name}</div>
          <span className="date">{props.date}</span>
        </div>
      </div>
      <span className="post-text-span">{props.textContent}</span>
      {/* this is where the image will go if there is one (<img src="./romero.png" alt="img" className="post-uploaded-img" />) */}
      {imageExists && (
        <img src={props.postImg} alt="img" className="post-uploaded-img" />
      )}
      <div className="post-details">
        <button className="show-comments-button">
          {props.commentsCount} comments
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
          <FontAwesomeIcon icon="fa-regular fa-message" className="post-icon"/>
          <span>Comment</span>
        </button>
      </div>
      <Comments comments={commentsToPass} postID={props.postID} />
    </div>
  );
};

// PostsContiner will map through the posts data from the database and fill up the container with the posts.
const PostsContainer = () => {
  // set initial state for incoming posts data
  // const [posts, setPosts] = useState([]);
  const {
    DynamicID,
    posts,
    updatePosts,
    groupNotUser,
    GroupID,
    LoggedInUserID,
    isGroupMember,
    GroupEvents,
    updateGroupEvents,
  } = useContext(LowerHeaderContext);

  // fetch home posts for the logged in user
  const userForm = new FormData();

  // the user id would have to be taken from somewhere (context data for user)

  // append to the form the loggedIn userID

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")).ID;

  userForm.append("loggedInUserID", loggedInUser);

  let clickedValue = groupNotUser ? GroupID : DynamicID;

  groupNotUser
    ? userForm.append("groupID", clickedValue)
    : userForm.append("userID", clickedValue);

  if (groupNotUser) {
    userForm.append("GuserID", LoggedInUserID);
  }

  console.log("groupifd -----***---  ", userForm.entries(), groupNotUser);

  for (const entry of userForm.entries()) {
    console.log("check ****", entry);
  }

  async function fetchPosts() {
    const resp = await fetch("http://localhost:8080/myposts", {
      method: "POST",
      body: userForm,
    });

    const data = await resp.json();

    console.log("FROM GO POSTS ---- >>  ", data);

    groupNotUser ? updatePosts(data.Posts) : updatePosts(data);
    if (groupNotUser) {
      updateGroupEvents(data.Events);
    }
  }

  // make a network request on component render.
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedValue]);

  // make a network request on component render.
  // useEffect(() => {
  //   fetchPosts();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [GroupID]);

  // if there is no image return "" else return img path as prop
  const handlePostImgPath = (strImgPath) => {
    return strImgPath === "" ? "" : `../assets/img/ext/${strImgPath}`;
  };
  const handleProfilePicImgPath = (strImgPath) => {
    return strImgPath === ""
      ? `../assets/img/ext/man-utd.png`
      : `../assets/img/ext/${strImgPath}`;
  };

  const handleCommentsCount = (commentsArr) => {
    return commentsArr === null ? 0 : commentsArr.length;
  };

  if (!groupNotUser) {
    return (
      <>
        <div className="posts-container">
          {posts?.map((post) => (
            <SinglePost
              key={post.postID}
              profileImgPath={handleProfilePicImgPath(post.profilePic)}
              name={post.name}
              date={post.createdAt}
              textContent={post.textContent}
              commentsCount={handleCommentsCount(post.comments)}
              postImg={handlePostImgPath(post.postImg)}
              commentsArray={post.comments}
              postID={post.postID}
            />
          ))}
        </div>
      </>
    );
  }

  if (groupNotUser && isGroupMember) {
    return (
      <>
        <div className="posts-container">
          <div className="group-event-banners">
            {GroupEvents?.map((gevent) => (
              <EventBanner
                key={gevent.eventid}
                creatorname={gevent.creator}
                date={gevent.date}
                eventname={gevent.eventname + " by " + gevent.creator}
                attending={gevent.cango}
                notattending={gevent.notgoing}
              />
            ))}
          </div>
          {posts?.map((post) => (
            <SinglePost
              key={post.postID}
              profileImgPath={"../assets/img/ext/man-utd.png"}
              name={post.name}
              date={post.createdAt}
              textContent={post.textContent}
              commentsCount={handleCommentsCount(post.comments)}
              postImg={handlePostImgPath(post.postImg)}
              commentsArray={post.comments}
              postID={post.postID}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="posts-container">
          <div className="not-a-member">
            <br></br>
            <br></br>
            This page is for members only!
            <br></br>
          </div>
        </div>
      </>
    );
  }
};

export default PostsContainer;
