import Link from "next/link";

export const LoginForm = ({ handleChange, handleSubmit }) => {
  return (
    <form
      className="flex w-full flex-col items-center gap-6 p-10 font-regular"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-4 ">
        <h2 className="font-heading text-4xl font-medium text-white">
          Log in:
        </h2>
      </div>

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
  );
};
