import { useSocket } from "../context/SocketProvider";
import Image from "next/image";
import { useConversations } from "../context/ConversationsProvider";
import { useState } from "react";

export const Sidebar = () => {
  const { contacts } = useSocket();
  const [chats, setChats] = useState({ query: "", chats: contacts });
  const { selectedIndex, setSelectedIndex, setRecipients } = useConversations();
  const changeCurrentChat = (index, contact) => {
    setSelectedIndex(index);
    setRecipients(contact);
  };

  const searchHandler = (e) => {
    const results = contacts.filter((contact) => {
      if (e.target.value === "") return contacts;
      return contact.username
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setChats({
      query: e.target.value,
      chats: results,
    });
  };

  return (
    <div
      className={`flex h-screen w-full flex-col bg-primary font-regular md:flex md:w-[35%] lg:w-[25%]`}
    >
      <div className="flex h-16 flex-col justify-center gap-4 bg-primary-dark px-5">
        <div className="flex items-center justify-center rounded-xl bg-primary px-4 py-2">
          <h2 className="text- font-regular  text-xl font-bold text-white">
            THECHATAPP
          </h2>
        </div>

        {/* <div className="flex justify-between ">
          <div className="p-3 text-xl text-white">Private</div>
          <div className="p-3 text-xl text-white">Private</div>
        </div> */}
      </div>
      <div className="w-full bg-primary px-5 py-4 ">
        <input
          type="search"
          onChange={searchHandler}
          value={chats.query}
          className=" w-full rounded-full border-none bg-primary-dark text-white placeholder-gray-300 drop-shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto py-5 px-2">
        {(chats.query ? chats.chats : contacts).map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`flex w-full items-center gap-4 rounded-lg px-5 py-2  ${
                selectedIndex === index && "bg-primary-dark"
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="relative h-16 w-16 ">
                <Image
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatar"
                  layout="fill"
                />
              </div>
              <div className="max-w-[60%] overflow-x-auto text-xl text-white selection:justify-end">
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
