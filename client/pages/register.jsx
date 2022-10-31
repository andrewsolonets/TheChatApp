import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { getUser, useAuth } from "../context/AuthContext";

export default function Register() {
  const router = useRouter();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { register } = useAuth();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const res = register(username, email, password);
      console.log(res);
      router.push("/setAvatar");
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
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
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col items-center gap-4 ">
              <h2 className="font-heading text-4xl font-medium text-white">
                Create user:
              </h2>
            </div>

            <input
              type="text"
              placeholder="Username"
              name="username"
              className="form-input  w-full rounded-lg border-none bg-primary text-white placeholder-gray-300"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-input  w-full rounded-lg border-none bg-primary text-white placeholder-gray-300"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-input  w-full rounded-lg border-none bg-primary text-white placeholder-gray-300"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="form-input  w-full rounded-lg border-none bg-primary text-white placeholder-gray-300"
              onChange={(e) => handleChange(e)}
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center  rounded-full bg-secondary py-2 px-4 text-2xl text-white"
            >
              Create User
            </button>
            <span className="text-white">
              Already have an account?
              <Link href="/login">
                <a className="text-secondary"> Login.</a>
              </Link>
            </span>
          </form>
        </div>
      </div>
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
