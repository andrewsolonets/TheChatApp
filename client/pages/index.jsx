import { Messanger } from "../components/Messanger";
import { getUser } from "../context/AuthContext";

export default function Home() {
  return <Messanger />;
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
  if (!auth?.user?.data?.isAvatarImageSet) {
    console.log("redirect on the way");
    return {
      redirect: {
        destination: "/setAvatar",
        permanent: false,
      },
    };
  }

  /*...stuff + getting "session/token"*/
  return {
    props: { auth },
  };
}
