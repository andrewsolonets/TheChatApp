import { useRef } from "react";
import socket from "./socket";
import Link from "next/link";
import { useRouter } from "next/router";

export const Starter = ({ state }) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const enterHandler = (e) => {
    e.preventDefault();
    const username = inputRef.current.value;
    console.log(username);
    e.target.reset();
    state(username);
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="flex h-52 w-4/5 items-center justify-center bg-sky-600">
        <form className="flex w-4/5 flex-col gap-4" onSubmit={enterHandler}>
          <div className="flex flex-col gap-2">
            <label className="form-label text-lg text-white">
              Enter your Nickname
            </label>
            <input type="text" ref={inputRef} className="form-input"></input>
          </div>
          <div className="flex gap-6">
            <button
              type="submit"
              className="flex max-w-fit items-center justify-center rounded-sm bg-sky-700 py-2 px-4 text-white"
            >
              Enter
            </button>
            {/* <button className="flex max-w-fit items-center justify-center rounded-sm bg-sky-200 py-2 px-4 text-sky-900">
              Create new id
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};
