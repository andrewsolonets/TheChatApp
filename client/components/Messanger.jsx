import { Conversation } from "./Conversation/Conversation";
import { Sidebar } from "./Sidebar";
import { useConversations } from "../context/ConversationsProvider";
import { Starter } from "./Starter";

export const Messanger = () => {
  const { recipients } = useConversations();

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        {recipients ? <Conversation /> : <Starter />}
      </div>
    </>
  );
};
