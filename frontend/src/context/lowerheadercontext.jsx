import { createContext, useState, useContext } from "react";
import { loggedInUserContext } from "./loggedInUserContext";
export const LowerHeaderContext = createContext();

export function LowerHeaderProvider({ children }) {
  const { loggedInUser } = useContext(loggedInUserContext);
  const [userID, setUserID] = useState("***********the number********");
  const [DBAllUsers, setDBAllUsers] = useState([]);

  const [GroupID, setGroupID] = useState(0);
  const [AllGroupsData, setAllGroupsData] = useState([]);

  const [AboutText, setAboutText] = useState(loggedInUser.AboutText);

  const [ProfilePhotoBackground, setProfilePhotoBackground] =
    useState("man-utd.png");

  const [LoggedInUserID] = useState(1);

  const updateUserID = (id) => {
    setUserID(() => id);
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
      }}
    >
      {children}
    </LowerHeaderContext.Provider>
  );
}
