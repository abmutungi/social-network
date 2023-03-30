import { createContext, useState } from "react";
import { followText, joinText } from "../components/UserRequestBtn";
import { PrivateText, PublicText } from "../pages/home/components/PrivateBtn";
// import { loggedInUserContext } from "./loggedInUserContext";
// import { UseIdFromUrl} from '../hooks/UseIdFromUrl'
export const LowerHeaderContext = createContext();

export function LowerHeaderProvider({ children }) {
  // const { loggedInUser } = useContext(loggedInUserContext);
  const [userID, setUserID] = useState(() => {
    if (localStorage.length > 0) {
      const storedUserID = JSON.parse(localStorage.getItem("loggedInUser")).ID;
      return storedUserID ? storedUserID : 0;
    }
  });
  const [DBAllUsers, setDBAllUsers] = useState([]);
  const [GroupID, setGroupID] = useState();
  const [AllGroupsData, setAllGroupsData] = useState([]);
  const [GroupEvents, setGroupEvents] = useState([]);

  const [DynamicID, setDynamicID] = useState(() => {
    if (localStorage.length > 0) {
      const storedDynamicID = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).ID;
      return storedDynamicID ? storedDynamicID : 0;
    }
  });
  const [posts, setPosts] = useState([]);
  const [groupPosts, setGroupPosts] = useState([]);

  const [AboutText, setAboutText] = useState(() => {
    if (localStorage.length > 0) {
      const storedAboutText = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).AboutText;
      return storedAboutText ? storedAboutText : "";
    }
  });

  const [Email, setEmail] = useState(() => {
    if (localStorage.length > 0) {
      const storedEmail = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).Email;
      return storedEmail ? storedEmail : "";
    }
  });

  const [Nickname, setNickname] = useState(() => {
    if (localStorage.length > 0) {
      const storedNickname = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).Nickname;
      return storedNickname ? storedNickname : "";
    }
  });

   const [DOB, setDOB] = useState(() => {
    if (localStorage.length > 0) {
      const storedDOB = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).DOB;
      return storedDOB ? storedDOB : "";
    }
  });


  

  const [ProfilePhotoBackground, setProfilePhotoBackground] = useState(() => {
    if (localStorage.length > 0) {
      const storedAvatar = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).Avatar;
      return storedAvatar != "" ? storedAvatar : "man-utd.png";
    }
  });
  const [LoggedInUserID, setLoggedInUserID] = useState(() => {
    if (localStorage.length > 0) {
      const storedLoggedInUserID = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).ID;
      return storedLoggedInUserID ? storedLoggedInUserID : 0;
    }
  });
  const [PrivacyBtnText, setPrivacyBtnText] = useState(() => {
    if (localStorage.length > 0) {
      let storedPrivacyStatus = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).Privacy;

      return JSON.parse(storedPrivacyStatus) ? PrivateText : PublicText;
    }
  });
  const [PrivacyStatus, setPrivacyStatus] = useState(() => {
    if (localStorage.length > 0) {
      let storedPrivacyStatus = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).Privacy;

      return JSON.parse(storedPrivacyStatus);
    }
  });

  const [Following, setFollowing] = useState();
  const [Requested, setRequested] = useState(false);
  const [GroupRequested, setGroupRequested] = useState(false);
  const [FollowText, setFollowText] = useState(followText);
  const [JoinText, setJoinText] = useState(joinText);
  const [isGroupMember, setisGroupMember] = useState(false);
  const [groupNotUser, setgroupNotUser] = useState(false);
  const [groupInvitees, setGroupInvitees] = useState([]);
  const [navData, setNavData] = useState([]);
  const [navClicked, setNavClicked] = useState(false);

  const updateNavClicked = (data) => {
    setNavClicked(data);
  };

  const updateNavData = (data) => {
    setNavData(data);
  };

  const updateGroupInvitees = (data) => {
    setGroupInvitees(data);
  };

  const updateUserID = (id) => {
    setUserID(() => id);
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
    // localStorage.setItem("PrivacyStatus", JSON.stringify(id));
  };

  const updateFollowText = (str) => {
    setFollowText(() => str);
  };

  const updateFollowing = (bool) => {
    setFollowing(() => bool);
  };

  const updateJoinText = (str) => {
    setJoinText(() => str);
  };
  const updateRequested = (bool) => {
    setRequested(() => bool);
  };

  const updateGroupRequested = (bool) => {
    setGroupRequested(() => bool);
  };

  const updateLoggedInUserID = (id) => {
    setLoggedInUserID(() => id);
  };

  const updatePrivacyBtnText = (str) => {
    setPrivacyBtnText(() => str);
  };
  const updateDynamicID = (id) => {
    setDynamicID(id);
  };

  const updatePosts = (data) => {
    setPosts(data);
  };

  const updateGroupPosts = (data) => {
    setGroupPosts(data);
  };

  const updateisGroupMember = (data) => {
    setisGroupMember(data);
  };

  const updategroupNotUser = (data) => {
    setgroupNotUser(data);
  };

  const updateGroupEvents = (data) => {
    setGroupEvents(data);
  };

    const updateEmail = (data) => {
    setEmail(() => data);
    };
  
   const updateNickname = (data) => {
    setNickname(() => data);
   };
   const updateDOB = (data) => {
    setDOB(() => data);
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
        DynamicID,
        updateDynamicID,
        posts,
        updatePosts,

        isGroupMember,
        updateisGroupMember,
        groupNotUser,
        updategroupNotUser,
        groupPosts,
        updateGroupPosts,
        GroupEvents,
        updateGroupEvents,
        JoinText,
        updateJoinText,
        GroupRequested,
        updateGroupRequested,
        groupInvitees,
        updateGroupInvitees,

        navClicked,
        updateNavClicked,
        navData,
        updateNavData,
        Email,
        updateEmail,
        Nickname,
        updateNickname,
        DOB,
        updateDOB,
      }}
    >
      {children}
    </LowerHeaderContext.Provider>
  );
}
