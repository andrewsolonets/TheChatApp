import { useState } from "react";
import EmojiIcon from "../../assets/EmojiIcon";
import SendIcon from "../../assets/SendIcon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useConversations } from "../../context/ConversationsProvider";

export const MessageInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const { sendMessage } = useConversations();
  const emojiAddHandler = (emojiObject) => {
    let msg = message;
    msg = msg += emojiObject.native;
    setMessage(msg);
    setShowEmojiPicker(false);
  };

  const sendHandler = (e) => {
    e.preventDefault();

    sendMessage(message);
    setMessage("");
  };
  const emojiBtnHandler = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  return (
    <div className="relative flex w-full basis-11 justify-between gap-2 px-4">
      {showEmojiPicker && (
        <div className="absolute bottom-12">
          <Picker data={data} onEmojiSelect={emojiAddHandler} theme={"light"} />
        </div>
      )}
      <button
        className="absolute h-full rounded-xl pl-3 pr-2 text-white"
        onClick={emojiBtnHandler}
      >
        <EmojiIcon className="h-5 w-5 fill-primary" />
      </button>

      <form
        onSubmit={sendHandler}
        className="flex w-full justify-between gap-2"
      >
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="form-input h-11 w-[94%] rounded-xl border-0 bg-white pl-10 focus:outline-0"
        ></input>
        <button className="h-full  rounded-xl  bg-white  pl-3 pr-2 text-white">
          <SendIcon className="h-7 w-7 fill-primary" />
        </button>
      </form>
    </div>
  );
};
