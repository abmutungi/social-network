import React, { useEffect, useState, createContext } from "react";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [openSocket, setOpenSocket] = useState(false);
  //const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  const [socketChatNotif, setSocketChatNotif] = useState(false);
  const [lastMsgSender, setLastMsgSender] = useState("");

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
          console.log(
            "last sender ==> ",
            newData.chatsfromgo[newData.chatsfromgo.length - 1].chatsender
          );
          updateChatMessages(newData.chatsfromgo);
          updateSocketChatNotifs(true);
          if (newData.chatsfromgo) {
            updateLastSender(
              newData.chatsfromgo[newData.chatsfromgo.length - 1].chatsender
            );
          }
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

  const updateSocketChatNotifs = (bool) => {
    setSocketChatNotif(bool);
  };

  const updateLastSender = (data) => {
    setLastMsgSender(() => data);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        openSocket,
        createSocket,
        messages,
        updateChatMessages,
        socketChatNotif,
        updateSocketChatNotifs,
        lastMsgSender,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
