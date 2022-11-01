import { useEffect, useState } from "react";
import { Conversation } from "./Conversation";
import Layout from "./Layout";
import { useRouter } from "next/router";
import { useSocket } from "../context/SocketProvider";
import { Sidebar } from "./Sidebar";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "../context/AuthContext";
import { useConversations } from "../context/ConversationsProvider";
import { Starter } from "./Starter";

export const Messanger = () => {
  const { auth, logout } = useAuth();
  const { recipients } = useConversations();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        {recipients ? <Conversation /> : <Starter />}
      </div>
    </>
  );
};
