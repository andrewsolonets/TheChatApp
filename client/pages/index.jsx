import { useState } from "react";
import { Messanger } from "../components/Messanger";

import { Starter } from "../components/Starter";

import { ConversationsProvider } from "../context/ConversationsProvider";
import { SocketProvider } from "../context/SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const messanger = <Messanger />;

  // socket.on("connect_error", (err) => {
  //   if (err.message === "invalid username") {
  //     setUser(null);
  //   }
  // });
  return messanger;
  // return <>{!user ? <Starter state={setUser} /> : messanger}</>;
}
