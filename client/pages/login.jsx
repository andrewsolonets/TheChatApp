import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginForm } from "../components/LoginForm";
import { getUser, useAuth } from "../context/AuthContext";

import { toastOptions, validateFormLogin } from "../utils/helpers";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormLogin(values)) {
      console.log(values);
      const { username, password } = values;
      try {
        const data = await login(username, password);
        console.log(data.status);
        if (!data.status) {
          toast.error(data.msg, toastOptions);
        }
        router.push("/");
        console.log(data);
      } catch (err) {
        toast.error(err.message, toastOptions);
      }
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="flex h-fit w-4/5 items-center justify-center rounded-2xl bg-primary-dark drop-shadow-xl lg:max-w-[50vw]">
          <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const auth = await getUser(ctx);
  if (auth.user) {
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
