import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { allUsersRoute } from "../utils/APIRoutes";

const SocketContext = React.createContext();

export const SocketProvider = (props) => {
  const auth = props.auth;
  const [socket, setSocket] = useState();
  const [contacts, setContacts] = useState([]);
  const user = auth?.user?.data ? auth?.user?.data : undefined;

  const URL = process.env.NEXT_PUBLIC_HOST;

  const getContacts = async () => {
    if (user) {
      const { data } = await axios.get(`${allUsersRoute}/${user._id}`);
      setContacts(data);
    }
  };

  useEffect(() => {
    if (user) {
      const newSocket = io(URL);
      newSocket.emit("add-user", user._id);
      setSocket(newSocket);
      console.log(newSocket);
      getContacts();

      newSocket.onAny((event, ...args) => {
        console.log(event, args);
      });
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
