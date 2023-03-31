import React, { useEffect, useState, createContext } from "react";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [openSocket, setOpenSocket] = useState(false);
  const [messages, setMessages] = useState([]);
  const [NewNotifsExist, setNewNotifsExist] = useState(false);
  const [groupMessages, setGroupMessages] = useState([]);
  const [socketChatNotif, setSocketChatNotif] = useState([]);
  const [lastMsgSender, setLastMsgSender] = useState("");
  const [lastClickedUser, setLastClickedUser] = useState(0);

  const [MyNotifs, setMyNotifs] = useState([]);
  let loggedInUser;
  if (localStorage.length > 0) {
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")).ID;
  }
  useEffect(() => {
    if (openSocket || performance.navigation.TYPE_RELOAD) {
      // create and open socket when component mounts
      const ws = new WebSocket("ws://localhost:8080/upgradesocket");
      setSocket(ws);
      ws.onopen = () => {
        console.log("socket is open");
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

  if (!!socket) {
    socket.onmessage = (e) => {
      const newData = JSON.parse(e.data);
      console.log("newData check --> ", e.data);

      console.log("sent through ws **********");

      if (newData.tipo === "chatHistory") {
        console.log(
          "last sender ==> ",
          newData.chatsfromgo[newData.chatsfromgo.length - 1].chatsender
        );
        if (
          newData.chatsfromgo[newData.chatsfromgo.length - 1].chatrecipient ==
          loggedInUser
        ) {
          console.log("THIS IS THE RECIPIENT CLIENT!!");
        }
        console.log("LAST CLICKED USER IN SOCKET ==> ", lastClickedUser);
        // console.log(newData.socketnotifiers);

        if (
          (lastClickedUser > 0 &&
            newData.chatsfromgo[newData.chatsfromgo.length - 1].chatsender ===
              lastClickedUser) ||
          (lastClickedUser > 0 &&
            newData.chatsfromgo[newData.chatsfromgo.length - 1]
              .chatrecipient === lastClickedUser)
        ) {
          updateChatMessages(newData.chatsfromgo);
        }
      }
      if (newData.tipo === "socketChatNotif") {
        let socketNotifObj = {
          socketnotifiers: [],
        };
        socketNotifObj.socketnotifiers = newData.socketnotifiers;
        console.log("checking sCN --> ", socketChatNotif.socketnotifiers);
        // newData.socketnotifiers = newData.socketnotifiers.filter(
        //   (item) => item !== lastClickedUser
        // );
        console.log("lcu in scN cond ==> ", lastClickedUser);
        if (lastClickedUser === 0 && newData.recID === loggedInUser) {
          updateSocketChatNotifs(newData);
        }

        if (lastClickedUser > 0 && newData.sendID === lastClickedUser) {
          console.log("BEFORE DEL WHEN SAME ==> ", newData.socketnotifiers);
          socketNotifObj.socketnotifiers =
            socketNotifObj.socketnotifiers.filter(
              (item) => item !== lastClickedUser
            );
          console.log("AFTER DEL WHEN SAME ==> ", newData.socketnotifiers);
          //updateSocketChatNotifs(socketNotifObj);
        }

        if (lastClickedUser > 0 && newData.sendID !== lastClickedUser) {
          updateSocketChatNotifs(socketNotifObj);
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
      }
    };
  }

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
  const updateSocketChatNotifs = (data) => {
    setSocketChatNotif(() => data);
  };

  const updateLastSender = (data) => {
    setLastMsgSender(() => data);
  };

  const updateLastClickedUser = (id) => {
    setLastClickedUser(() => id);
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
        updateLastClickedUser,
        updateNewNotifsExist,
        updateMyNotifs,
        groupMessages,
        updateGroupMessages,
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
