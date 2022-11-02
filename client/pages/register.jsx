import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { getUser, useAuth } from "../context/AuthContext";
import { handleValidationRegister } from "../utils/helpers";
import { RegisterForm } from "../components/Forms/RegisterForms";

export default function Register() {
  const router = useRouter();

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
    if (handleValidationRegister(values)) {
      const { email, username, password } = values;
      const res = register(username, email, password);
      // console.log(res);
      router.push("/setAvatar");
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="flex h-fit w-4/5 items-center justify-center rounded-2xl bg-primary-dark drop-shadow-xl lg:max-w-[50vw]">
          <RegisterForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
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
