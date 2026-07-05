import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiUpload,
  FiBarChart2,
  FiAward,
  FiCheckSquare,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: FiHome },
  { name: "Profile", path: "/profile", icon: FiUser },
  { name: "Job Criteria", path: "/jobs", icon: FiBriefcase },
  { name: "Upload Resume", path: "/upload-resume", icon: FiUpload },
  { name: "Analysis Result", path: "/analysis", icon: FiBarChart2 },
  { name: "Candidate Ranking", path: "/ranking", icon: FiAward },
  { name: "Shortlist", path: "/shortlist", icon: FiCheckSquare },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <aside className="hidden w-72 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <h2 className="mb-8 text-xl font-bold text-indigo-600 dark:text-indigo-400">
          AI Resume Analyzer
        </h2>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <section className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-lg font-semibold">Recruitment Dashboard</h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default DashboardLayout;