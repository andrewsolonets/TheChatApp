import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const handleChange = () => {
    console.log("e");
  };
  const handleSubmit = () => {
    console.log("e");
  };

  return (
    <>
      <section>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Create user:</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link href="/login">Login.</Link>
          </span>
        </form>
      </section>
      <ToastContainer />
    </>
  );
}
