import React, { useEffect, useState, createContext } from "react";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [openSocket, setOpenSocket] = useState(false);
  //const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (openSocket || performance.navigation.TYPE_RELOAD) {
      // create and open socket when component mounts
      const ws = new WebSocket("ws://localhost:8080/upgradesocket");
      setSocket(ws);
      ws.onopen = () => {
        console.log("socket is open");
      };

      ws.onmessage = (e) => {
        const newData = JSON.parse(e.data);
        console.log("newData check --> ", e.data);

        console.log("sent through ws **********");
        console.log(
          "Checking data type in single onmessage",
          newData.chatsfromgo[4].message
        );

        if (newData.tipo === "chatHistory") {
          updateChatMessages(newData.chatsfromgo);
        }
      };
      return () => {
        // close socket when component unmounts
        ws.close();
        ws.onclose = () => {
          console.log("socket is closed");
        };
      };
    }
  }, [openSocket]);

  const createSocket = (bool) => {
    setOpenSocket(bool);
  };

  const updateChatMessages = (data) => {
    setMessages(() => data);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        openSocket,
        createSocket,

        messages,
        updateChatMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
