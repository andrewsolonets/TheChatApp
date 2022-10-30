import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Starter = ({ state }) => {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-fit w-4/5 flex-col items-center justify-center gap-10 rounded-2xl bg-primary-dark p-8 drop-shadow-xl lg:max-w-[50vw]">
        <h2 className="font-heading text-2xl text-white">
          Choose conversation to start
        </h2>
      </div>
    </div>
  );
};
