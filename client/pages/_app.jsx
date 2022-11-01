import { AuthProvider, getUser } from "../context/AuthContext";
import "../styles/globals.css";
import { SocketProvider } from "../context/SocketProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";
import Head from "next/head";

function MyApp({ Component, pageProps: { auth, ...pageProps } }) {
  console.log(auth);
  return (
    <>
      <Head>
        <title>The Chat App</title>
      </Head>

      <AuthProvider myAuth={auth}>
        <SocketProvider auth={auth}>
          <ConversationsProvider auth={auth}>
            <div className=" h-screen w-screen bg-bgColor">
              <Component {...pageProps} />
            </div>
          </ConversationsProvider>
        </SocketProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
