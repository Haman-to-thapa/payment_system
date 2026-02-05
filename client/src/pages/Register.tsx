import { useState } from "react";
import api from "../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      window.location.href = "/";
    } catch (err) {
      setError("User already exists");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        className="input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

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

      <button className="btn btn-primary" onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have an account?{" "}
        <span
          style={{ color: "#3f5ef8", cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
