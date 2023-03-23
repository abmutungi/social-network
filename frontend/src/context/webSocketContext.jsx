import React, { useEffect, useState, createContext } from "react";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [openSocket, setOpenSocket] = useState(false);
  //const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
 const [NewNotifsExist, setNewNotifsExist] = useState(false);

  const [MyNotifs, setMyNotifs] = useState([]);
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
     
        if (newData.tipo === "chatHistory") {
          updateChatMessages(newData.chatsfromgo);
        }

        if (newData.tipo == "allNotifs") {
        updateMyNotifs(newData.allNotifs)
        updateNewNotifsExist(newData)
        console.log("socket on message in notif bell --------->", newData);
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

  const updateNewNotifsExist = (bool) => {
    setNewNotifsExist(bool);
  };

  const updateMyNotifs = (data) => {
    setMyNotifs(() => data);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        openSocket,
        createSocket,

        messages,
        updateChatMessages,

        NewNotifsExist,
        MyNotifs,

        updateNewNotifsExist,
        updateMyNotifs
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
