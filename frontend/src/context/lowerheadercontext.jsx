import { createContext, useState, useContext } from "react";
import { followText } from "../components/UserRequestBtn";
import { loggedInUserContext } from "./loggedInUserContext";
// import { UseIdFromUrl} from '../hooks/UseIdFromUrl'
export const LowerHeaderContext = createContext();

export function LowerHeaderProvider({ children }) {
  const { loggedInUser } = useContext(loggedInUserContext);
  const [userID, setUserID] = useState();
  const [DBAllUsers, setDBAllUsers] = useState([]);
  const [GroupID, setGroupID] = useState();
  const [AllGroupsData, setAllGroupsData] = useState([]);

  const [DynamicID, setDynamicID] = useState(0);
  const [posts, setPosts] = useState([]);
  const [AboutText, setAboutText] = useState("loggedInUser.AboutText");

  const [ProfilePhotoBackground, setProfilePhotoBackground] =
    useState("man-utd.png");
  const [LoggedInUserID, setLoggedInUserID] = useState();
  const [PrivacyBtnText, setPrivacyBtnText] = useState();
  const [PrivacyStatus, setPrivacyStatus] = useState(loggedInUser.Privacy);
  const [Following, setFollowing] = useState();
  const [Requested, setRequested] = useState(false);
  const [FollowText, setFollowText] = useState(followText);
  const [isGroupMember, setisGroupMember] = useState(false);
  const [groupNotUser, setgroupNotUser] = useState(false);


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
  }
  const updateDynamicID = (id) => {
    setDynamicID(id);
  };

  const updatePosts = (data) => {
    setPosts(data);
  };


  const updateisGroupMember= (data) => {
    setisGroupMember(data);
  };
  
  const updategroupNotUser = (data)=>{
    setgroupNotUser(data)
  }
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
        DynamicID,
        updateDynamicID,
        posts,
        updatePosts,
        isGroupMember,
        updateisGroupMember,
        groupNotUser,
        updategroupNotUser
      }}
    >
      {children}
    </LowerHeaderContext.Provider>
  );
}
