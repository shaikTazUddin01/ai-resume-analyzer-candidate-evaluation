import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Jobs from "../pages/Jobs/Jobs";
import UploadResume from "../pages/UploadResume/UploadResume";
import Analysis from "../pages/Analysis/Analysis";
import Ranking from "../pages/Ranking/Ranking";
import Shortlist from "../pages/Shortlist/Shortlist";
import Admin from "../pages/Admin/Admin";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/shortlist" element={<Shortlist />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;