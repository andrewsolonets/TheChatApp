import { useCallback, useEffect, useRef } from "react";
import LogoutIcon from "../assets/LogoutIcon";
import SendIcon from "../assets/SendIcon";
import { useAuth } from "../context/AuthContext";
import { useConversations } from "../context/ConversationsProvider";
import { useChatScroll } from "../hooks/useChatScroll";

export const Conversation = () => {
  const messageRef = useRef();
  const { logout } = useAuth();

  const { sendMessage, messagesReceived, recipients } = useConversations();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const handleLogout = () => {
    logout();
  };

  const sendHandler = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    console.log(message);
    sendMessage(message);
    e.target.reset();
  };

  return (
    <div className="fixed bottom-0 top-0 right-0 w-[75%] font-regular">
      <div className="flex h-16 w-full items-center justify-between bg-primary-dark py-3 px-5  text-white">
        <h2 className="font-heading text-3xl capitalize">
          {recipients.username}
        </h2>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center rounded-xl bg-primary  p-2"
        >
          <LogoutIcon className="h-7 w-7  " />
        </button>
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
          className=" relative flex w-full basis-11 justify-between px-4"
          onSubmit={sendHandler}
        >
          <input
            type="text"
            ref={messageRef}
            className="form-input h-11 w-[94%] rounded-xl border-0  bg-white focus:outline-0"
          ></input>
          <button className="  h-full  rounded-xl  bg-white  pl-3 pr-2 text-white">
            <SendIcon className="h-7 w-7 fill-primary" />
          </button>
        </form>
      </div>
    </div>
  );
};
