import { createContext, useState } from "react";

const loggedInUserContext = createContext({});

function LoggedInUserProvider({ children }) {
  const [NewNotifsExist, setNewNotifsExist] = useState(false);
  // const [MyNotifs, setMyNotifs] = useState({});
  const [webSocket, setWebSocket] = useState({});

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

  const createWebSocket = () => {
    //new WebSocket("ws://localhost:8080/upgradesocket");
    setWebSocket(new WebSocket("ws://localhost:8080/upgradesocket"));
    console.log("check web socket function works");
    //console.log("ws check --> ", ws);
    //  ws.onopen = () => {
    //    console.log("connection established");
    //  };
  };

  return (
    <loggedInUserContext.Provider
      value={{
        loggedInUser,
        updateLoggedInUser,
        NewNotifsExist,
        updateNewNotifsExist,
        createWebSocket,
        webSocket,
      }}
    >
      {children}
    </loggedInUserContext.Provider>
  );
}

export { loggedInUserContext, LoggedInUserProvider };
