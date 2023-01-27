import { createContext, useState } from "react";

const loggedInUserContext = createContext({});

function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({});
  function updateLoggedInUser(user) {
    setLoggedInUser(user);
  }

  return (
    <loggedInUserContext.Provider value={{ loggedInUser, updateLoggedInUser }}>
      {children}
    </loggedInUserContext.Provider>
  );
}

export { loggedInUserContext, LoggedInUserProvider };
