import { createContext, useState, useContext } from "react";
import { followText } from "../components/UserRequestBtn";
import { loggedInUserContext } from "./loggedInUserContext";
// import { UseIdFromUrl} from '../hooks/UseIdFromUrl'
export const LowerHeaderContext = createContext();

export function LowerHeaderProvider({ children }) {
  const [userID, setUserID] = useState(0);
  const [DBAllUsers, setDBAllUsers] = useState([]);
  const [PrivacyStatus, setPrivacyStatus] = useState(0);
  const [GroupID, setGroupID] = useState(0);
  const [AllGroupsData, setAllGroupsData] = useState([]);

  const [DynamicID, setDynamicID] = useState(0);
  const [posts, setPosts] = useState([]);
  const [AboutText, setAboutText] = useState("loggedInUser.AboutText");

  const [ProfilePhotoBackground, setProfilePhotoBackground] =
    useState("man-utd.png");
  const { loggedInUser } = useContext(loggedInUserContext);
  const [LoggedInUserID, setLoggedInUserID] = useState(loggedInUser.ID);
  const [Following, setFollowing] = useState();
  const [Requested, setRequested] = useState(false);
  const [FollowText, setFollowText] = useState(followText);

  const updateUserID = (id) => {
    setUserID(() => id);
    // if (!Following) updateFollowText(followText);
    // fetchRelationship(LoggedInUserID, userID);
  };

  const updateinitialDB = (data) => {
    setDBAllUsers(() => data);
  };

  const updateGroupID = (id) => {
    setGroupID(() => id);
  };

  const updateAllGroupsData = (data) => {
    setAllGroupsData(() => data);
  };

  const updateAboutText = (data) => {
    setAboutText(() => data);
  };

  const updateProfilePhotoBackground = (data) => {
    setProfilePhotoBackground(() => data);
  };

  const updatePrivacyStatus = (id) => {
    setPrivacyStatus(() => id);
  };

  const updateFollowText = (str) => {
    setFollowText(() => str);
  };

  const updateFollowing = (bool) => {
    setFollowing(() => bool);
  };

  const updateRequested = (bool) => {
    setRequested(() => bool);
  };

  const updateLoggedInUserID = (id) => {
    setLoggedInUserID(() => id);
  };

  const updateDynamicID = (id) => {
    setDynamicID(id);
  };

  const updatePosts = (data) => {
    setPosts(data);
  };

  return (
    <LowerHeaderContext.Provider
      value={{
        userID,
        DBAllUsers,
        updateUserID,
        updateinitialDB,
        GroupID,
        updateGroupID,
        AllGroupsData,
        updateAllGroupsData,
        AboutText,
        updateAboutText,
        ProfilePhotoBackground,
        updateProfilePhotoBackground,
        PrivacyStatus,
        updatePrivacyStatus,
        FollowText,
        updateFollowText,
        Following,
        Requested,
        updateFollowing,
        updateRequested,
        LoggedInUserID,
        updateLoggedInUserID,
        DynamicID,
        updateDynamicID,
        posts,
        updatePosts,
      }}
    >
      {children}
    </LowerHeaderContext.Provider>
  );
}
