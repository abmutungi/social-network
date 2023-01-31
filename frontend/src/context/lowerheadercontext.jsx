import { createContext, useState, useContext } from "react";
import { followText } from "../components/UserRequestBtn";
import { loggedInUserContext } from "./loggedInUserContext";
// import { UseIdFromUrl} from '../hooks/UseIdFromUrl'
export const LowerHeaderContext = createContext();

export function LowerHeaderProvider({ children }) {
  const [userID, setUserID] = useState(0);
  const [DBAllUsers, setDBAllUsers] = useState([]);
  const [GroupID, setGroupID] = useState(0);
  const [AllGroupsData, setAllGroupsData] = useState([]);

  const [AboutText, setAboutText] = useState("loggedInUser.AboutText");

  const [ProfilePhotoBackground, setProfilePhotoBackground] =
    useState("man-utd.png");
  const { loggedInUser } = useContext(loggedInUserContext);
  const [LoggedInUserID, setLoggedInUserID] = useState(loggedInUser.ID);
  const [PrivacyBtnText, setPrivacyBtnText] = useState();
  const [PrivacyStatus, setPrivacyStatus] = useState(loggedInUser.Privacy);
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

  const updatePrivacyBtnText = (str) => {
    setPrivacyBtnText(() => str);
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
        PrivacyBtnText,
        updatePrivacyBtnText,
      }}
    >
      {children}
    </LowerHeaderContext.Provider>
  );
}
