/* eslint-disable react-hooks/set-state-in-effect */
import {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { AuthContext } from "./auth.context";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const token = localStorage.getItem("token");

  const loadUser = async () => {
    try {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      const res = await api.get("/auth/profile");
      setUser(res.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const register = async (formData) => {
    const res = await api.post("/auth/register", formData);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    }

    toast.success("Account created successfully");
    return res.data;
  };

  const login = async (formData) => {
    const res = await api.post("/auth/login", formData);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    }

    toast.success("Login successful");
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logout successful");
  };

  const value = {
    user,
    token,
    authLoading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
