import { useConversations } from "../../context/ConversationsProvider";
import { ConversationHeader } from "./ConversationHeader";
import { Messages } from "./Messages";
import { MessageInput } from "./MessageInput";

export const Conversation = () => {
  const { recipients } = useConversations();

  return (
    <div
      className={`${
        recipients ? "fixed" : "hidden"
      }    bottom-0 top-0 right-0 w-full bg-bgColor font-regular md:w-[65%] md:bg-none lg:w-[75%]`}
    >
      <ConversationHeader />

      <div className="flex h-screen max-h-full flex-col items-center  gap-4   pb-4">
        <Messages />
        <MessageInput />
      </div>
    </div>
  );
};
