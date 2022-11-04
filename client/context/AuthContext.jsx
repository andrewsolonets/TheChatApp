import { createContext, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  currentUserRoute,
  loginRoute,
  logoutRoute,
  registerRoute,
  setAvatarRoute,
} from "../utils/APIRoutes";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/helpers";

const AuthContext = createContext();

export const getUser = async (ctx) => {
  // console.log(ctx);
  return await axios
    .get(
      currentUserRoute,
      {
        headers: ctx?.req?.headers?.cookie
          ? { cookie: ctx.req.headers.cookie }
          : undefined,
      },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.data) {
        return { status: "SIGNED_IN", user: res.data };
      } else {
        return { status: "SIGNED_OUT", user: null };
      }
    })
    .catch((err) => {
      console.log(err.message);
      return { status: "SIGNED_OUT", user: null };
    });
};

export const AuthProvider = (props) => {
  const router = useRouter();
  const auth = props.myAuth || { status: "SIGNED_OUT", user: null };
  const login = async (username, password) => {
    return await axios
      .post(
        loginRoute,
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        console.log(data);
        Cookies.set("jwt", data.data.token, { secure: true });
        router.push("/");
        return data.data;
        // router.replace("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const register = async (username, email, password) => {
    const { data } = await axios.post(
      registerRoute,
      {
        username,
        email,
        password,
      },
      { withCredentials: true }
    );
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      // REDO!
      // console.log(data);
      Cookies.set("jwt", data.token, { secure: true });
      router.push("/setAvatar");
      // set User
    }
  };

  const logout = async () => {
    return await axios
      .get(`${logoutRoute}/${auth.user.data._id}`, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        Cookies.remove("jwt");

        router.push("/");
        console.log("user logged out");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const chooseImg = async (avatars, selectedAvatar) => {
    console.log(selectedAvatar);
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      try {
        const { data } = await axios.post(
          `${setAvatarRoute}/${auth.user.data._id}`,
          {
            image: avatars[selectedAvatar],
          }
        );

        if (data.isSet) {
          console.log("SUCCESS");
          auth.user.data.isAvatarImageSet = true;
          auth.user.data.avatarImage = data.image;
        }
      } catch (err) {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, logout, register, login, chooseImg }}
      {...props}
    />
  );
};

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
