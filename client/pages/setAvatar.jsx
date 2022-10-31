import { useEffect, useState } from "react";
import Image from "next/image";
import { useAvatars } from "../hooks/useAvatars";
import { useRouter } from "next/router";
import { getUser, useAuth } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";

export default function SetAvatar() {
  const { auth, chooseImg } = useAuth();
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { avatars, isLoading } = useAvatars();

  const handleSetImg = async () => {
    const data = await chooseImg(avatars, selectedAvatar);
    router.push("/");

    // router.replace("/");
  };
  // console.log(avatars);

  useEffect(() => {
    if (!auth.user) {
      router.push("/login");
    } else if (auth?.user?.data?.isAvatarImageSet) {
      router.push("/");
    }
  }, [auth.user]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex h-screen items-center justify-center ">
          <div className="flex h-fit w-4/5 flex-col items-center justify-center gap-10 rounded-2xl bg-primary-dark p-8 drop-shadow-xl lg:max-w-[50vw]">
            <h2 className="font-heading text-4xl font-medium text-white">
              Pick your profile picture
            </h2>
            <div className="flex w-full max-w-xl justify-between ">
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
                      unoptimized
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
      )}
      <ToastContainer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const auth = await getUser(ctx);
  console.log("MESSANGER", auth);
  /*...stuff + getting "session/token"*/
  return {
    props: { auth },
  };
}
