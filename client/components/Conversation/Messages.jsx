import { useCallback } from "react";
import { useConversations } from "../../context/ConversationsProvider";

export const Messages = () => {
  const { messagesReceived, recipients } = useConversations();

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  return (
    <div className=" h-4/5 w-full overflow-y-auto  ">
      <div className=" flex w-full flex-col gap-4 p-4">
        {messagesReceived.map((el, i) => {
          // console.log(el);
          return (
            <div
              ref={setRef}
              className={`flex ${
                el.fromSelf
                  ? " self-end rounded-br-none bg-primary-dark"
                  : "rounded-bl-none bg-secondary"
              } min-w-40 w-fit max-w-md flex-col gap-2 rounded-2xl  px-8 py-6 text-white`}
              key={i}
            >
              <h4 className="text-md font-heading font-bold capitalize tracking-wider">
                {el.fromSelf ? "You" : recipients.username}
              </h4>
              <p>{el.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
