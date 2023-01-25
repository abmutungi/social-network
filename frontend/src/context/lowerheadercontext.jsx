import { createContext, useState } from "react";
export const LowerHeaderContext = createContext();

export function LowerHeaderProvider({ children }) {
  const [userID, setUserID] = useState(0);
  const [DBAllUsers, setDBAllUsers] = useState([]);

  const [GroupID, setGroupID] = useState(0);
  const [AllGroupsData, setAllGroupsData] = useState([]);

  const [AboutText, setAboutText] = useState("About Text Placeholder");

  const [ProfilePhotoBackground, setProfilePhotoBackground] =
    useState("man-utd.png");

  const [LoggedInUserID] = useState(1);

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
