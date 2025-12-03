// src/pages/Login.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.detail || "Login failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="page">
      <h1 className="page-title">Login</h1>
      <div className="card">
        {err && <p className="error">{err}</p>}
        <form onSubmit={submit}>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <button className="primary" type="submit" disabled={busy}>{busy ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
}
