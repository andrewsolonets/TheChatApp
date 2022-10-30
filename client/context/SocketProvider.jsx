import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useLocalStorage from "../hooks/useLocalStorage";
import { allUsersRoute } from "../utils/APIRoutes";
import { useAuth } from "./AuthContext";

const SocketContext = React.createContext();

export const SocketProvider = (props) => {
  const auth = props.auth;
  const [socket, setSocket] = useState();
  const [contacts, setContacts] = useState([]);
  // console.log(auth.user.data, "THIS IS SOCKET");
  const user = auth?.user?.data ? auth?.user?.data : undefined;

  const URL = "https://thechatapp.vercel.app";

  // const newUser = async ({ username, email, password }) => {
  //   //  const {email, username, password} = values
  //   const { data } = await axios.post();
  // };

  const getContacts = async () => {
    if (user) {
      const { data } = await axios.get(`${allUsersRoute}/${user._id}`);
      // console.log(data);
      setContacts(data);
    }
  };

  useEffect(() => {
    if (user) {
      const newSocket = io(URL);
      // newSocket.auth = { username };
      // newSocket.connect();
      newSocket.emit("add-user", user._id);
      setSocket(newSocket);
      console.log(newSocket);
      getContacts();

      // TEST ONLY!
      // newSocket.on("users", (users) => {
      //   console.log(users);
      // });

      newSocket.onAny((event, ...args) => {
        console.log(event, args);
      });

      // return () => newSocket.close();
    }

    // dependencies include only user id, may have to change to the whole user object
  }, [user]);

  const value = {
    user,
    socket,
    contacts,
  };

  return <SocketContext.Provider value={value} {...props} />;
};

export const useSocket = () => useContext(SocketContext);
export const SocketConsumer = SocketContext.Consumer;
