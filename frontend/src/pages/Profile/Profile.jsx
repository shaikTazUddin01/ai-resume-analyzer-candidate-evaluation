import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit, FiMail, FiShield, FiUser } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import {
  updateProfile,
  changePassword,
} from "../../services/profile.service";

const Profile = () => {
  const { user } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [name, setName] = useState(user?.name || "Admin User");
  const [email, setEmail] = useState(user?.email || "admin@example.com");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({ name, email });
      toast.success("Profile updated successfully");
      setEditOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Profile update failed");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      await changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setPasswordOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Password change failed");
    }
  };

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
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
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

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Account Information
            </h2>

            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <FiEdit />
              Edit Profile
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard icon={FiUser} label="Full Name" value={user?.name || "Admin User"} />
            <InfoCard icon={FiMail} label="Email Address" value={user?.email || "admin@example.com"} />
            <InfoCard icon={FiShield} label="User Role" value={user?.role || "admin"} />
            <InfoCard icon={FiShield} label="Account Status" value="Active" />
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
            <button
              onClick={() => setPasswordOpen(true)}
              className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
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

      {editOpen && (
        <Modal title="Edit Profile" onClose={() => setEditOpen(false)}>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Full name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Email"
            />
            <button className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white">
              Save Changes
            </button>
          </form>
        </Modal>
      )}

      {passwordOpen && (
        <Modal title="Change Password" onClose={() => setPasswordOpen(false)}>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Current password"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              placeholder="New password"
            />
            <button className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white">
              Update Password
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value }) => (
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

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        <button onClick={onClose} className="text-slate-500 hover:text-red-500">
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Profile;