import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            AI Resume Analyzer
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
            <Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;