import { createContext, useState, useEffect } from "react";

const loggedInUserContext = createContext({});

function LoggedInUserProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      const newSocket = new WebSocket("ws://localhost:8080/upgradesocket");
      newSocket.onopen = () => {
        console.log("WebSocket connection opened");
      };
      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      newSocket.onclose = () => {
        console.log("WebSocket connection closed, logout");
      };
      setSocket(newSocket);

      // Clean up function to close the WebSocket when the component unmounts or the user logs out
      return () => {
        newSocket.close();
      };
    }
  }, [loggedIn]);
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
        socket,
        setLoggedIn,
      }}
    >
      {children}
    </loggedInUserContext.Provider>
  );
}

export { loggedInUserContext, LoggedInUserProvider };
