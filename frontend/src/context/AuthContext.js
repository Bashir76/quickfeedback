// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // On mount try to restore session/token
    const token = localStorage.getItem("token");
    if (token) {
      // we have token — optionally fetch user
      api
        .get("auth/user/")
        .then((res) => {
          setUser(res.data);
          setLoadingAuth(false);
        })
        .catch(() => {
          // token may still be valid but backend doesn't return user; set basic username
          setUser({ username: "user" });
          setLoadingAuth(false);
        });
    } else {
      // try session-based: call user endpoint; if returns user, we are logged-in
      api
        .get("auth/user/")
        .then((res) => {
          setUser(res.data);
          setLoadingAuth(false);
        })
        .catch(() => {
          setUser(null);
          setLoadingAuth(false);
        });
    }
  }, []);

  const register = async (username, password) => {
    const res = await api.post("auth/register/", { username, password });
    return res.data;
  };

  const login = async (username, password) => {
    const res = await api.post("auth/login/", { username, password });
    // if server returns token, save it
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }
    // try to fetch user
    try {
      const userRes = await api.get("auth/user/");
      setUser(userRes.data);
    } catch {
      // fallback: set to username if server doesn't provide user object
      setUser({ username });
    }
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post("auth/logout/");
    } catch (err) {
      // ignore
    }
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, register, login, logout, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
