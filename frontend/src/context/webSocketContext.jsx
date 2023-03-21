import React, { useEffect, useState, createContext } from "react";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [openSocket, setOpenSocket] = useState(false);

  useEffect(() => {
    if (openSocket || performance.navigation.TYPE_RELOAD) {
      // create and open socket when component mounts
      const ws = new WebSocket("ws://localhost:8080/upgradesocket");
      setSocket(ws);

      return () => {
        // close socket when component unmounts
        ws.close();
      };
    }
  }, [openSocket]);

  const createSocket = (bool) => {
    setOpenSocket(bool);
  };

  return (
    <SocketContext.Provider value={{ socket, openSocket, createSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
