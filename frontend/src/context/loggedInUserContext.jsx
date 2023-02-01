import { createContext, useState } from "react";

const loggedInUserContext = createContext({});

function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [Notifications, setNotifications] = useState(false);

  function updateLoggedInUser(user) {
    setLoggedInUser(user);
  }

    const updateNotifications = (bool) => {
      setNotifications(bool);
    };

  return (
    <loggedInUserContext.Provider
      value={{
        loggedInUser,
        updateLoggedInUser,
        Notifications,
        updateNotifications,
      }}
    >
      {children}
    </loggedInUserContext.Provider>
  );
}

export { loggedInUserContext, LoggedInUserProvider };
