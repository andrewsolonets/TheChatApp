import Link from "next/link";

export const RegisterForm = ({ handleChange, handleSubmit }) => {
  return (
    <form
      className="flex w-full flex-col items-center gap-7 p-10 font-regular"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex flex-col items-center gap-4 ">
        <h2 className="font-heading text-4xl font-medium text-white">
          Create user:
        </h2>
      </div>

      <div className="relative w-full">
        <input
          id="username"
          type="text"
          placeholder="Username"
          name="username"
          className="peer form-input w-full rounded-lg border-none  bg-primary text-white placeholder-transparent outline-none focus:ring-0 "
          onChange={(e) => handleChange(e)}
        />
        <label
          for="username"
          className="absolute left-3 -top-5 text-sm text-gray-300 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-300"
        >
          Username
        </label>
      </div>

      <div className="relative w-full">
        <input
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          className="peer form-input w-full rounded-lg border-none  bg-primary text-white placeholder-transparent outline-none focus:ring-0 "
          onChange={(e) => handleChange(e)}
        />
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
          className="peer form-input w-full rounded-lg border-none  bg-primary text-white placeholder-transparent outline-none focus:ring-0 "
          onChange={(e) => handleChange(e)}
        />
        <label
          for="password"
          className="absolute left-3 -top-5 text-sm text-gray-300 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-300"
        >
          Password
        </label>
      </div>

      <div className="relative w-full">
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="peer form-input w-full rounded-lg border-none  bg-primary text-white placeholder-transparent outline-none focus:ring-0 "
          onChange={(e) => handleChange(e)}
        />
        <label
          for="confirmPassword"
          className="absolute left-3 -top-5 text-sm text-gray-300 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-300"
        >
          Confirm Password
        </label>
      </div>

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
