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
  const [clickedName, setClickedName] = useState("");
  const [groupEventSocket, updateGroupEventsSocket] = useState([]);

  const [MyNotifs, setMyNotifs] = useState([]);
  let loggedInUser;
  if (localStorage.length > 0) {
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")).ID;
  }
  const [newSocketGroupMessage, setNewSocketGroupMessage] = useState(false);
  const [socketGroupIDs, setSocketGroupIDs] = useState([]);

  const [clickedGroupID, setClickedGroupID] = useState(0);
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
      // console.log("newData check --> ", e.data);

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
          updateSocketChatNotifs(socketNotifObj);
        }

        if (lastClickedUser > 0 && newData.sendID === lastClickedUser) {
          console.log("Sent Name ==> ", newData.sendName);
          console.log(
            "BEFORE DEL WHEN SAME ==> ",
            socketNotifObj.socketnotifiers
          );
          socketNotifObj.socketnotifiers =
            socketNotifObj.socketnotifiers.filter(
              (item) => item !== newData.sendName
            );
          console.log(
            "AFTER DEL WHEN SAME ==> ",
            socketNotifObj.socketnotifiers
          );
          setSocketChatNotif(socketNotifObj);
        }

        if (lastClickedUser > 0 && newData.sendID !== lastClickedUser) {
          console.log("Clciked name ===> ", clickedName);
          socketNotifObj.socketnotifiers =
            socketNotifObj.socketnotifiers.filter(
              (item) => item !== clickedName
            );
          setSocketChatNotif(socketNotifObj);
          // updateChatMessages(newData.chatsfromgo);
          // updateSocketChatNotifs(true);
          // if (newData.chatsfromgo) {
          //   updateLastSender(
          //     newData.chatsfromgo[newData.chatsfromgo.length - 1].chatsender
          //   );
          // }
        }
      }

      if (newData.tipo == "allNotifs") {
        updateMyNotifs(newData.allNotifs);
        updateNewNotifsExist(newData);
        console.log("socket on message in notif bell --------->", newData);
      }
      if (newData.tipo === "groupEvents") {
        console.log("EVENTS??? --->", newData.groupEvents);
        updateGroupEventsSocket(newData.groupEvents);
        // need to create a new struct on backend with a []chats and tipo == newgroupMessage
        setGroupMessages(newData.groupMessages);
      }

      if (newData.tipo === "newGroupMessage") {
        // only update if the opened chat box is same group id as the incoming group ID
        // console.log("before removing through socket", socketGroupIDs);
        if (clickedGroupID > 0 && clickedGroupID == newData.groupID) {
          console.log("checking clicked group", clickedGroupID);

          // console.log("after removing through socket", socketGroupIDs);
          setGroupMessages(newData.groupMessages);
        }

        // only for the message receivers
        if (newData.newNotif === "true") {
          setNewSocketGroupMessage(true);
          setSocketGroupIDs(newData.groupIDs);

          if (clickedGroupID > 0 && clickedGroupID == newData.groupID) {
            setSocketGroupIDs(
              socketGroupIDs.filter((groupID) => groupID !== clickedGroupID)
            );
            // set the message to read through the socket, if the chatbox is open
            const messageToRead = {};

            messageToRead["loggedInUser"] = JSON.parse(
              localStorage.getItem("loggedInUser")
            ).ID;
            messageToRead["groupID"] = clickedGroupID;
            messageToRead["type"] = "groupChatboxClosed";
            socket.send(JSON.stringify(messageToRead));

            setNewSocketGroupMessage(false);
          }
        }
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

  const updateLastClickedUser = (id) => {
    setLastClickedUser(() => id);
  };

  const updateClickedName = (name) => {
    setClickedName(() => name);
  };

  const updateClickedGroupID = (data) => {
    setClickedGroupID(() => data);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        openSocket,
        createSocket,
        messages,
        updateChatMessages,
        updateClickedName,
        NewNotifsExist,
        MyNotifs,
        updateLastClickedUser,
        groupEventSocket,

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
        clickedGroupID,
        updateClickedGroupID,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
