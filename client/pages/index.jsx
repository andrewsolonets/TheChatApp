import { useState } from "react";
import { Messanger } from "../components/Messanger";

import socket from "../components/socket";
import { Starter } from "../components/Starter";
import { ConversationsProvider } from "../context/ConversationsProvider";
import { SocketProvider } from "../context/SocketProvider";

export default function Home() {
  const [nameSelected, setNameSelected] = useState();

  const messanger = (
    <SocketProvider name={nameSelected}>
      <ConversationsProvider>
        <Messanger />
      </ConversationsProvider>
    </SocketProvider>
  );

  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      setNameSelected(false);
    }
  });
  return <>{!nameSelected ? <Starter state={setNameSelected} /> : messanger}</>;
}
