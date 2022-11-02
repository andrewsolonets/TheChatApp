import Link from "next/link";

export const LoginForm = ({ handleChange, handleSubmit }) => {
  return (
    <form
      className="flex w-full flex-col items-center gap-7 p-10 font-regular"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-4 ">
        <h2 className="font-heading text-4xl font-medium text-white">
          Log in:
        </h2>
      </div>

      <div className="relative w-full">
        <input
          id="email"
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
          className="peer form-input w-full rounded-lg border-none  bg-primary text-white placeholder-transparent outline-none focus:ring-0 "
        ></input>
        <label
          for="email"
          className="absolute left-3 -top-5 text-sm text-gray-300 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-300"
        >
          Email
        </label>
      </div>

      <div className="relative w-full">
        <input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
          className="peer form-input w-full rounded-lg border-none  bg-primary text-white placeholder-transparent outline-none focus:ring-0 "
        ></input>
        <label
          for="password"
          className="absolute left-3 -top-5 text-sm text-gray-300 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-300"
        >
          Password
        </label>
      </div>
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
