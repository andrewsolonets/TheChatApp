import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useLocalStorage from "../hooks/useLocalStorage";

const SocketContext = React.createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  // const [user, setUser] = useLocalStorage("user");
  const [user, setUser] = useState();
  // let user = "hello";
  // const setUser = (data) => {
  //   console.log(data);
  // };

  const URL = "http://localhost:3001";

  // const newUser = async ({ username, email, password }) => {
  //   //  const {email, username, password} = values
  //   const { data } = await axios.post();
  // };

  // useEffect(() => {
  //   if (user) {
  //     const newSocket = io(URL, { autoConnect: false });
  //     // newSocket.auth = { username };
  //     // newSocket.connect();
  //     newSocket.emit("add-user", user._id);
  //     setSocket(newSocket);
  //     console.log(newSocket);

  //     // TEST ONLY!
  //     // newSocket.on("users", (users) => {
  //     //   console.log(users);
  //     // });

  //     newSocket.onAny((event, ...args) => {
  //       console.log(event, args);
  //     });

  //     // return () => newSocket.close();
  //   }

  //   // dependencies include only user id, may have to change to the whole user object
  // }, [user]);

  const value = {
    setUser,
    user,
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
