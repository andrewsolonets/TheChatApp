import { useEffect, useState } from "react";
import Image from "next/image";
import { Buffer } from "buffer";
import { useAvatars } from "../hooks/useAvatars";
import { useRouter } from "next/router";
import { getUser, useAuth } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

export default function SetAvatar() {
  const { chooseImg } = useAuth();
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { avatars, isLoading } = useAvatars();

  const handleSetImg = async () => {
    await chooseImg(avatars, selectedAvatar);
    router.push("/");
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="flex h-fit w-4/5 flex-col items-center justify-center gap-10 rounded-2xl bg-primary-dark p-8 drop-shadow-xl lg:max-w-[50vw]">
          <h2 className="font-heading text-4xl font-medium text-white">
            Pick your profile picture
          </h2>
          <div className="flex w-full max-w-xl justify-between ">
            {isLoading && (
              <div className="flex w-full items-center justify-center">
                <BeatLoader loading={isLoading} color={"#F9A620"} size={20} />
              </div>
            )}
            {avatars.map((el, index) => {
              return (
                <div
                  className={`relative h-24 w-24 rounded-full bg-slate-400 ${
                    selectedAvatar === index &&
                    "outline  outline-8  outline-secondary"
                  }`}
                  key={el}
                >
                  <Image
                    onClick={() => {
                      setSelectedAvatar(index);
                    }}
                    src={`data:image/svg+xml;base64,${el}`}
                    alt={index}
                    layout="fill"
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={handleSetImg}
            className="flex w-full items-center justify-center  rounded-full bg-secondary py-2 px-4 text-2xl text-white"
          >
            Enter
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const auth = await getUser(ctx);

  if (!auth.user) {
    console.log("redirect on the way");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (auth?.user?.data?.isAvatarImageSet) {
    console.log("redirect on the way");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { auth },
  };
}
