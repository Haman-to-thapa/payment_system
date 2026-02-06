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

  return (
    <div className="container">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>

      <p>
        Don’t have an account?{" "}
        <span
          style={{ color: "#3f5ef8", cursor: "pointer" }}
          onClick={() => (window.location.href = "/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
}


const styles = {
  body: {
    margin: 0,
    fontFamily: "system-ui, sans-serif",
    background: "#f4f6fb",
    minHeight: "100vh",
    padding: "16px",
  },
  container: {
    maxWidth: "420px",
    margin: "40px auto",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#3f5ef8",
    color: "#fff",
    marginTop: "8px",
  },
};