import { FiEdit, FiMail, FiShield, FiUser } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          User Profile
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          View and manage your account information.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-4xl font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {user?.name || "Admin User"}
            </h2>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              {user?.email || "admin@example.com"}
            </p>

            <span className="mt-4 rounded-full bg-green-100 px-4 py-1 text-sm font-semibold capitalize text-green-700 dark:bg-green-950 dark:text-green-300">
              {user?.role || "admin"}
            </span>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Account Information
            </h2>

            <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              <FiEdit />
              Edit Profile
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={FiUser}
              label="Full Name"
              value={user?.name || "Admin User"}
            />

            <InfoCard
              icon={FiMail}
              label="Email Address"
              value={user?.email || "admin@example.com"}
            />

            <InfoCard
              icon={FiShield}
              label="User Role"
              value={user?.role || "admin"}
            />

            <InfoCard
              icon={FiShield}
              label="Account Status"
              value="Active"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
          Security Settings
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Password
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep your account secure by using a strong password.
            </p>
            <button className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
              Change Password
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              JWT Authentication
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your session is protected using JSON Web Token authentication.
            </p>
            <span className="mt-4 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 dark:border-slate-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
        <Icon size={22} />
      </div>

      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <h3 className="font-semibold capitalize text-slate-900 dark:text-white">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default Profile;