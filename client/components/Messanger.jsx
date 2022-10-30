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
  // const { contacts } = useContacts();
  const { auth, logout } = useAuth();
  const { recipients } = useConversations();
  const router = useRouter();
  useEffect(() => {
    if (!auth.user) {
      router.replace("/login");
    } else if (auth?.user?.data?.isAvatarImageSet) {
      console.log(auth?.user?.data?.isAvatarImageSet);
    } else {
      router.replace("/setAvatar");
    }
  }, [auth.user]);
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="flex h-screen">
        {/* <button onClick={handleLogout}>Logout</button> */}
        <Sidebar />
        {recipients ? <Conversation /> : <Starter />}
        {/* <Sidebar />
        <Conversation /> */}
        {/* <div className="flex flex-col gap-4">
          {users.map((el, i) => (
            <span key={i}>{el.username}</span>
          ))}
        </div> */}
      </div>
    </>
  );
};
