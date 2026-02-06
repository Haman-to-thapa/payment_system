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
      await api.post("/auth/register", { username, email, password });
      window.location.href = "/";
    } catch {
      setError("User already exists");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Create Account</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.btn} onClick={handleRegister}>
            Register
          </button>

          <p style={{ marginTop: "12px" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#3f5ef8", cursor: "pointer" }}
              onClick={() => (window.location.href = "/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}


const styles: Record<string, React.CSSProperties> = {
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
