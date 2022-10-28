import axios from "axios";
import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function ConversationsProvider({ children, auth }) {
  const { socket, contacts } = useSocket();
  const user = auth?.user?.data ? auth?.user?.data : undefined;

  const [conversations, setConversations] = useState([]);
  const [messagesReceived, setMessages] = useState([]);
  const [recipients, setRecipients] = useState([
    { _id: "635bfcf7793265eb120493f9" },
  ]);

  // get conversation index
  const [selectedIndex, setSelectedIndex] = useState(0);

  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [
        ...prevConversations,
        { recipients, messages: messagesReceived || [] },
      ];
    });
  }

  const getMessages = async () => {
    const { data } = await axios.post(recieveMessageRoute, {
      from: user._id,
      to: recipients._id,
      // to: recipients.map((r) => r._id),
    });
    setMessages(data);
  };

  const addMessageToConversation = useCallback(
    (msg) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const from = user._id;
        const newMessage = { from, msg };
        const recipients1 = recipients._id;
        const newConversations = prevConversations.map((conversation) => {
          if (conversation.to === recipients1) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [
            ...prevConversations,
            { recipients1, messages: [newMessage] },
          ];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("msg-recieve", addMessageToConversation);

    // return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  useEffect(() => {
    createConversation(recipients);
  }, [recipients]);

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
    addMessageToConversation(msg);
    // const msgs = [...messages];

    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);
  };

  const formattedConversations = conversations?.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact._id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact._id === message.from;
      });
      const name = (contact && contact.name) || message.from;
      const fromMe = contact._id === message.from;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedIndex;
    return { ...conversation, messages, recipients, selected };
  });

  // const addMessageToConversation = useCallback(
  //   ({ recipients, text, sender }) => {},
  //   []
  // );

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedIndex],
    setRecipients,
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
