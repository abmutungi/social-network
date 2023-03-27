import { createContext, useState } from "react";

const loggedInUserContext = createContext({});

function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [chatNotifsOnLogin, setChatNotifsOnLogin] = useState([]);
  function updateLoggedInUser(user) {
    setLoggedInUser(user);

    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }

  const updateChatNotifsOnLogin = (data) => {
    setChatNotifsOnLogin(() => data);
  };

  return (
    <loggedInUserContext.Provider
      value={{
        loggedInUser,
        updateLoggedInUser,
        chatNotifsOnLogin,
        updateChatNotifsOnLogin,
      }}
    >
      {children}
    </loggedInUserContext.Provider>
  );
}

export { loggedInUserContext, LoggedInUserProvider };
