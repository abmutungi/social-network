import { createContext, useState } from "react";
import { followText } from "../components/UserRequestBtn";
// import { UseIdFromUrl} from '../hooks/UseIdFromUrl'
export const LowerHeaderContext = createContext();

export function LowerHeaderProvider({ children }) {
  const [userID, setUserID] = useState(0);
  const [DBAllUsers, setDBAllUsers] = useState([]);
  const [PrivacyStatus, setPrivacyStatus] = useState(0);
  const [GroupID, setGroupID] = useState(0);
  const [AllGroupsData, setAllGroupsData] = useState([]);

  const [AboutText, setAboutText] = useState("About Text Placeholder");

  const [ProfilePhotoBackground, setProfilePhotoBackground] =
    useState("man-utd.png");

  const [LoggedInUserID] = useState(1);
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
        LoggedInUserID,
        PrivacyStatus,
        updatePrivacyStatus,
        FollowText,
        updateFollowText,
        Following,
        Requested,
        updateFollowing,
        updateRequested,
      }}
    >
      {children}
    </LowerHeaderContext.Provider>
  );
}
