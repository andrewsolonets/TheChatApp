import Layout from "../components/Layout";
import App from "next/app";

import { AuthProvider, getUser } from "../context/AuthContext";
import "../styles/globals.css";
import { SocketProvider } from "../context/SocketProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";

function MyApp({ Component, pageProps, auth }) {
  console.log(auth);
  return (
    <AuthProvider myAuth={auth}>
      <SocketProvider auth={auth}>
        <ConversationsProvider auth={auth}>
          <div className=" h-screen w-screen bg-bgColor">
            <Component {...pageProps} />
          </div>
        </ConversationsProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // const allCookies = cookies(appContext.req);
  // console.log("these are cookies", allCookies);
  const appProps = await App.getInitialProps(appContext);
  const auth = await getUser(appContext.ctx);
  return { ...appProps, auth: auth };
};

// export async function getServerSideProps(context) {
//   const allCookies = cookies(appContext);
//   console.log("these are cookies", allCookies);

//   const appProps = await App.getInitialProps(context);
//   return {
//     props: { ...appProps, auth: auth }, // will be passed to the page component as props
//   };
// }

export default MyApp;
