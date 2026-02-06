interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        background: "#3F5EF8",
        color: "#fff",
        padding: "14px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <small>{role === "admin" ? "Admin Panel" : "User Panel"}</small>
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "#E74C3C",
          border: "none",
          color: "#fff",
          padding: "8px 14px",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        Logout
      </button>
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