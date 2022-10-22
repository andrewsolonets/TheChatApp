import { useEffect, useState } from "react";
import { Conversation } from "./Conversation";
import Layout from "./Layout";
import { useSocket } from "../context/SocketProvider";
import { Sidebar } from "./Sidebar";

export const Messanger = () => {
  // const [users, setUsers] = useState([]);
  // socket.on("users", (users) => {
  //   console.log(users);

  //   // // put the current user first, and then sort by username

  //   setUsers(users);
  // });
  // useEffect(() => {
  //   socket.on("user connected", (user) => {
  //     if (!users.includes(user)) setUsers((prevState) => [...prevState, user]);
  //   });
  //   socket.on("user disconnected", (id) => {
  //     setUsers((prevState) => prevState.filter((el) => el.userID !== id));
  //   });
  //   console.log(users);
  // }, [socket]);

  return (
    <>
      <div className="flex h-screen   ">
        <Sidebar />
        <Conversation />
        {/* <div className="flex flex-col gap-4">
          {users.map((el, i) => (
            <span key={i}>{el.username}</span>
          ))}
        </div> */}
      </div>
    </>
  );
};
