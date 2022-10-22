import React, { useContext, useState, useEffect, useCallback } from "react";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ name: username, children }) {
  const socket = useSocket();
  const [messagesReceived, setMessages] = useState([]);

  const sendMessage = (recipients, text) => {
    socket.emit("send_message", { recipients, text });
  };

  // const addMessageToConversation = useCallback(
  //   ({ recipients, text, sender }) => {},
  //   []
  // );

  const value = {
    sendMessage,
    messagesReceived,
  };

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", (msg) => {
      const fromMe = username === msg.sender;
      const newMessage = { ...msg, fromMe };
      console.log(newMessage);
      return setMessages((prevState) => [...prevState, newMessage]);
    });

    return () => socket.off("receive-message");
  }, [socket]);

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
