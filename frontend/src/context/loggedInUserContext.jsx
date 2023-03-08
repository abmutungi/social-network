import { createContext, useState } from "react";

const loggedInUserContext = createContext({});

function LoggedInUserProvider({ children }) {
  const [NewNotifsExist, setNewNotifsExist] = useState(false);
  // const [MyNotifs, setMyNotifs] = useState({});

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  function updateLoggedInUser(user) {
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }

  const updateNewNotifsExist = (bool) => {
    setNewNotifsExist(bool);
  };

  return (
    <loggedInUserContext.Provider
      value={{
        loggedInUser,
        updateLoggedInUser,
        NewNotifsExist,
        updateNewNotifsExist,
      }}
    >
      {children}
    </loggedInUserContext.Provider>
  );
}

export { loggedInUserContext, LoggedInUserProvider };
