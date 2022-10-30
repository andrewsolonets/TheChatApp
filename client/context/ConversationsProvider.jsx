import axios from "axios";
import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function ConversationsProvider({ children, auth }) {
  const { socket, contacts } = useSocket();
  const user = auth?.user?.data ? auth?.user?.data : undefined;

  const [messagesReceived, setMessages] = useState([]);
  const [recipients, setRecipients] = useState();

  // get conversation index
  const [selectedIndex, setSelectedIndex] = useState(null);

  const getMessages = async () => {
    const { data } = await axios.post(recieveMessageRoute, {
      from: user?._id,
      to: recipients?._id,
      // to: recipients.map((r) => r._id),
    });
    setMessages(data);
  };

  const addMessageToConversation = (msg, self) => {
    if (messagesReceived) {
      console.log(messagesReceived);
      console.log("addMessageToConversation");
      const newMessage = { fromSelf: self, message: msg };
      const messagesNew = [...messagesReceived];
      messagesNew.push(newMessage);
      setMessages(messagesNew);
    }
  };

  useEffect(() => {
    if (socket == null) return;

    socket.on("msg-recieve", (msg) => {
      console.log("MSG RECEIVE USE EFFECT");
      addMessageToConversation(msg, false);
    });

    // return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  // Get messages for current chat
  useEffect(() => {
    getMessages();
  }, [recipients]);

  // get contacts, one contact = user object
  // change chat requires contact user object

  const sendMessage = async (msg) => {
    // socket
    socket.emit("send-msg", { to: recipients._id, from: user._id, msg });

    // Database
    await axios.post(sendMessageRoute, {
      from: user._id,
      to: recipients._id,
      message: msg,
    });

    // Current conversation messages
    addMessageToConversation(msg, true);
    // const msgs = [...messages];

    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);
  };

  // const addMessageToConversation = useCallback(
  //   ({ recipients, text, sender }) => {},
  //   []
  // );

  const value = {
    recipients,
    setRecipients,
    selectedIndex,
    setSelectedIndex,
    sendMessage,
    messagesReceived,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

export const useConversations = () => useContext(ConversationsContext);
export const ConversationsConsumer = ConversationsContext.Consumer;
