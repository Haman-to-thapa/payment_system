import { useState } from "react";
import api from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      window.location.href =
        res.data.role === "admin" ? "/admin" : "/payments";
    } catch {
      setError("Invalid credentials");
    }
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "420px",
    margin: "60px auto",
    padding: "14px",
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#3F5EF8",
    color: "#fff",
    marginTop: "8px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginTop: 0 }}>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        style={inputStyle}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={inputStyle}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={buttonStyle} onClick={handleLogin}>
        Login
      </button>

      <p style={{ marginTop: 12 }}>
        Don’t have an account?{" "}
        <span
          style={{ color: "#3F5EF8", cursor: "pointer" }}
          onClick={() => (window.location.href = "/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
}
