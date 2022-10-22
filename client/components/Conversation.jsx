import { useCallback, useRef } from "react";
import { useConversations } from "../context/ConversationsProvider";
import { useChatScroll } from "../hooks/useChatScroll";

export const Conversation = () => {
  const messageRef = useRef();
  const { sendMessage, messagesReceived } = useConversations();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const sendHandler = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    console.log(message);
    sendMessage(["test"], message);
    e.target.reset();
  };

  return (
    <div className="fixed bottom-0 top-0 right-0 w-4/5">
      <div className="w-full bg-slate-400 py-3 pl-5 text-3xl text-white">
        Roomname
      </div>

      <div className="flex h-screen max-h-full flex-col items-center  gap-4  bg-slate-300  px-4 pb-4">
        <div className=" h-4/5 w-full overflow-y-scroll  ">
          <div className=" flex w-full flex-col gap-2">
            {messagesReceived.map((el, i) => {
              console.log(el);
              return (
                <div
                  ref={setRef}
                  className={`flex ${
                    el.fromMe && "self-end"
                  } w-fit flex-col rounded-lg bg-slate-500 px-6 py-3 text-white`}
                  key={i}
                >
                  <h4 className="text-md font-bold">{el.sender}</h4>
                  <p>{el.text}</p>
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
          <button className="absolute right-0  h-full rounded-sm bg-slate-700 px-4 py-2 text-white">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
