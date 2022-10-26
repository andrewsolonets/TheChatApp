import axios from "axios";
import React, { useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { allUsersRoute } from "../utils/APIRoutes";
import { useSocket } from "./SocketProvider";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const { user } = useSocket();
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const getContacts = async () => {
    if (user) {
      const { data } = await axios.get(`${allUsersRoute}/${user._id}`);
      setContacts(data);
    }
  };

  // useEffect(() => {
  //   getContacts();
  // }, [user?._id]);

  return (
    <ContactsContext.Provider value={contacts}>
      {children}
    </ContactsContext.Provider>
  );
}
