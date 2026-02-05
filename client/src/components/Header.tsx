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
