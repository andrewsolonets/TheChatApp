import { useState } from "react";
import { Messanger } from "../components/Messanger";

import { Starter } from "../components/Starter";
import { getUser } from "../context/AuthContext";

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

export async function getServerSideProps(ctx) {
  const auth = await getUser(ctx);
  console.log("MESSANGER", auth);
  /*...stuff + getting "session/token"*/
  return {
    props: { auth },
  };
}
