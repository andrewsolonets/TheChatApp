import { useSocket } from "../context/SocketProvider";
import Image from "next/image";
import { useConversations } from "../context/ConversationsProvider";

export const Sidebar = () => {
  const { contacts } = useSocket();
  const { selectedIndex, setSelectedIndex, setRecipients } = useConversations();
  const changeCurrentChat = (index, contact) => {
    setSelectedIndex(index);
    setRecipients(contact);
  };

  // console.log(contacts);

  return (
    <div className="flex h-screen w-[25%] flex-col bg-primary font-regular">
      <div className="flex h-[5.448rem] flex-col justify-center gap-4 bg-primary-dark px-5 ">
        <input
          type="search"
          className=" rounded-full border-none bg-primary text-white placeholder-gray-300 drop-shadow-sm"
        />
        {/* <div className="flex justify-between ">
          <div className="p-3 text-xl text-white">Private</div>
          <div className="p-3 text-xl text-white">Private</div>
        </div> */}
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto py-5 px-2">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`flex w-full items-center gap-4 rounded-lg px-5 py-2  ${
                selectedIndex === index && "bg-primary-dark"
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="relative h-16 w-16">
                <Image
                  unoptimized
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt=""
                  layout="fill"
                />
              </div>
              <div className="justify-end text-xl text-white">
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
