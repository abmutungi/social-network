import React, { useEffect, useState, createContext } from "react";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [openSocket, setOpenSocket] = useState(false);
  const [messages, setMessages] = useState([]);
  const [NewNotifsExist, setNewNotifsExist] = useState(false);
  const [groupMessages, setGroupMessages] = useState([]);
  const [socketChatNotif, setSocketChatNotif] = useState(false);
  const [lastMsgSender, setLastMsgSender] = useState("");
  const [newSocketGroupMessage, setNewSocketGroupMessage] = useState(false);
  const [socketGroupIDs, setSocketGroupIDs] = useState([]);
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
        // console.log("newData check --> ", e.data);

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

        if (newData.tipo == "allNotifs") {
          updateMyNotifs(newData.allNotifs);
          updateNewNotifsExist(newData);
          console.log("socket on message in notif bell --------->", newData);
        }
        console.log("sent through ws **********");

        if (newData.tipo === "newGroupMessage") {
          // need to create a new struct on backend with a []chats and tipo == newgroupMessage
          setGroupMessages(newData.groupMessages);
          if (newData.newNotif === "true") {
            setNewSocketGroupMessage(true);
            setSocketGroupIDs(newData.groupIDs);
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

  const updateNewNotifsExist = (bool) => {
    setNewNotifsExist(bool);
  };

  const updateMyNotifs = (data) => {
    setMyNotifs(() => data);
  };

  const updateGroupMessages = (data) => {
    setGroupMessages(data);
  };
  const updateSocketChatNotifs = (bool) => {
    setSocketChatNotif(bool);
  };

  const updateLastSender = (data) => {
    setLastMsgSender(() => data);
  };

  // const updateSocketGroupIDs = (data) => {
  //   setNewSocketMessageGroupID(newSocketMessageGroupID.push(data));
  // };

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
        updateMyNotifs,
        groupMessages,
        updateGroupMessages,
        socketChatNotif,
        updateSocketChatNotifs,
        lastMsgSender,
        newSocketGroupMessage,
        setNewSocketGroupMessage,
        socketGroupIDs,
        setSocketGroupIDs,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
