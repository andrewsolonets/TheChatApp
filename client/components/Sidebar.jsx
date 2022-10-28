import { useSocket } from "../context/SocketProvider";

export const Sidebar = () => {
  const privateHandler = () => {
    return;
  };

  const { contacts } = useSocket();
  console.log(contacts);

  return (
    <div className="flex h-screen w-1/5 flex-col bg-slate-400">
      <button className="flex w-full items-start justify-center py-4 text-xl text-white">
        test
      </button>
      <button className="flex w-full items-start justify-center bg-slate-500 py-4 text-xl text-white">
        Rooms
      </button>
      <button className="flex w-full items-start justify-center bg-slate-400 py-4 text-xl text-white">
        Private Chats
      </button>
    </div>
  );
};
