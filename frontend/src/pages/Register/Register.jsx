import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "admin",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setServerError("");

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      navigate("/dashboard");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Registration failed. Please try again.";

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
            Create Your Account and{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Get Started
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Join the AI Resume Analyzer platform to manage resumes, evaluate
            candidates, and make smarter recruitment decisions.
          </p>

          <div className="space-y-5">
            <Feature title="AI-Powered Analysis" text="Analyze resumes using AI and generate match scores." />
            <Feature title="Secure Authentication" text="Protected login system using JWT authentication." />
            <Feature title="Smart Candidate Ranking" text="Rank and shortlist candidates based on job criteria." />
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <FiUserPlus />
            </div>

            <h2 className="text-3xl font-bold">Create Your Account</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Fill in the details below to continue
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
                Full Name
              </label>

              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-300 bg-white px-12 py-3 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
              </div>

              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                  placeholder="Create a password"
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

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Confirm Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-12 py-3 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Role</label>

              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                {...register("role", {
                  required: "Role is required",
                })}
              >
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
              </select>

              {errors.role && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FiUserPlus />
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Login here
            </Link>
          </p>
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

export default Register;