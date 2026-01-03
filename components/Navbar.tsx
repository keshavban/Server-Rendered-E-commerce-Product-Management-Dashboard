export default function Navbar() {
  return (
    <header
      style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "linear-gradient(to right, #020617, #020617cc)",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        🏠 General Admin Portal
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ color: "#94a3b8", fontSize: "14px" }}>
          Admin
        </span>

        <button
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "1px solid #334155",
            background: "transparent",
            color: "#e5e7eb",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
