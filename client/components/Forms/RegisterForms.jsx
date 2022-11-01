import Link from "next/link";

export const RegisterForm = ({ handleChange, handleSubmit }) => {
  return (
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
  );
};
