import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setServerError("");

      await login({
        email: data.email,
        password: data.password,
      });

      navigate("/dashboard");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";

      setServerError(message);
    }
  };

  return (
    <section className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <p className="mb-4 inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            AI-Powered Hiring Solution
          </p>

          <h1 className="mb-5 text-5xl font-bold leading-tight">
            Find the Best Talent with{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              AI Power
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Upload resumes, analyze skills, match candidates, and make smarter
            hiring decisions in seconds.
          </p>

          <div className="space-y-5">
            <Feature title="Smart Resume Analysis" text="AI analyzes resumes and extracts key information." />
            <Feature title="Best Match Scoring" text="Get accurate match scores for every candidate." />
            <Feature title="Secure & Confidential" text="Your recruitment data is protected." />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <FiLock />
            </div>

            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Login to your account to continue
            </p>
          </div>

          {serverError && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-300 bg-white px-12 py-3 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-12 py-3 pr-12 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FiLogIn />
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Create Account
            </Link>
          </p>

          <div className="mt-6 rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <p className="font-semibold">Demo Admin</p>
            <p>Email: admin@example.com</p>
            <p>Password: 123456</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ title, text }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{text}</p>
    </div>
  );
};

export default Login;