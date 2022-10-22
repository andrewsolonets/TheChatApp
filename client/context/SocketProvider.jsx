import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ name: username, children }) => {
  const [socket, setSocket] = useState();

  const URL = "http://localhost:3001";

  useEffect(() => {
    const newSocket = io(URL, { autoConnect: false });
    newSocket.auth = { username };
    newSocket.connect();
    setSocket(newSocket);
    console.log(newSocket);

    // TEST ONLY!
    newSocket.on("users", (users) => {
      console.log(users);
    });

    newSocket.onAny((event, ...args) => {
      console.log(event, args);
    });

    return () => newSocket.close();
  }, [username]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
