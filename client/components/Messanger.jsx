import { useEffect, useState } from "react";
import { Conversation } from "./Conversation";
import Layout from "./Layout";
import { useRouter } from "next/router";
import { useSocket } from "../context/SocketProvider";
import { Sidebar } from "./Sidebar";
import useLocalStorage from "../hooks/useLocalStorage";

export const Messanger = () => {
  // const { user } = data;
  const router = useRouter();
  useEffect(() => {
    if (true) {
      router.replace("/login");
    }
  }, []);
  return (
    <>
      <div className="flex h-screen   ">
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
