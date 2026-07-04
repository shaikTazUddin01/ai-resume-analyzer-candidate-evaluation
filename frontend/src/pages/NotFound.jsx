import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-6 text-slate-600 dark:text-slate-300">Page not found</p>
        <Link to="/" className="rounded-xl bg-indigo-600 px-6 py-3 text-white">
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;