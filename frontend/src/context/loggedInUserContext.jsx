import { createContext, useState, useEffect } from "react";

const loggedInUserContext = createContext({});

function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [NewNotifsExist, setNewNotifsExist] = useState(false);

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
