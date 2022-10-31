import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const router = useRouter();
  const { login, auth } = useAuth();
  const [values, setValues] = useState({ username: "", password: "" });

  useEffect(() => {
    if (auth.user) {
      router.push("/", { shallow: true });
    }
  }, []);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(values);
      const { username, password } = values;
      try {
        const data = await login(username, password);
        console.log(data.status);
        if (!data.status) {
          toast.error(data.msg, toastOptions);
        }
        router.push("/", { shallow: true });
        console.log(data);
      } catch (err) {
        toast.error(err.message, toastOptions);
      }

      // if (data.status === false) {
      //   toast.error(data.msg, toastOptions);
      // }
      // if (data.status === true) {
      //   setUser(data.user);

      //   router.replace("/");
      // }
    }
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="flex h-fit w-4/5 items-center justify-center rounded-2xl bg-primary-dark drop-shadow-xl lg:max-w-[50vw]">
          <form
            className="flex w-full flex-col items-center gap-6 p-10 font-regular"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center gap-4 ">
              <h2 className="font-heading text-4xl font-medium text-white">
                Log in:
              </h2>
            </div>

            {/* <label className="form-label text-lg text-white">
              Enter your Nickname
            </label> */}

            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              className="form-input  w-full rounded-lg border-none bg-primary text-white placeholder-gray-300"
            ></input>

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              className="form-input w-full rounded-lg border-none bg-primary text-white placeholder-gray-300"
            ></input>

            <button
              type="submit"
              className="flex w-full items-center justify-center  rounded-full bg-secondary py-2 px-4 text-2xl text-white"
            >
              Enter
            </button>
            <span className="text-white">
              Don't have an account?
              <Link href="/register">
                <a className="text-secondary"> Create One.</a>
              </Link>
            </span>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
