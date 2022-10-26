import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";
import { SocketProvider } from "../context/SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";

export const ContextWrapper = ({ children }) => {
  return <SocketProvider>{children}</SocketProvider>;
};
