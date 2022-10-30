import { useCallback, useEffect, useRef } from "react";
import { useConversations } from "../context/ConversationsProvider";
import { useChatScroll } from "../hooks/useChatScroll";

export const Conversation = () => {
  const messageRef = useRef();

  const { sendMessage, messagesReceived, recipients } = useConversations();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const sendHandler = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    console.log(message);
    sendMessage(message);
    e.target.reset();
  };

  return (
    <div className="fixed bottom-0 top-0 right-0 w-[75%] font-regular">
      <div className="w-full bg-primary-dark py-3 pl-5 font-heading text-3xl capitalize text-white">
        {recipients.username}
      </div>

      <div className="flex h-screen max-h-full flex-col items-center  gap-4   px-4 pb-4">
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
        <form
          className=" relative flex w-full basis-11 justify-end"
          onSubmit={sendHandler}
        >
          <input
            type="text"
            ref={messageRef}
            className="form-input w-full border-collapse  rounded-lg bg-amber-50 focus:outline-0"
          ></input>
          <button className="absolute right-0  h-full rounded-sm bg-primary-dark px-4 py-2 text-white">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
