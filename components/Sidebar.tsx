"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const link = (href: string, label: string, icon: string) => {
    const active = pathname.startsWith(href);

    return (
      <Link
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 14px",
          borderRadius: "8px",
          color: active ? "#ffffff" : "#94a3b8",
          background: active ? "rgba(99,102,241,0.15)" : "transparent",
          fontWeight: active ? 600 : 500,
          textDecoration: "none",
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ fontSize: "16px" }}>{icon}</span>
        {label}
      </Link>
    );
  };

  return (
    <aside
      style={{
        width: "240px",
        background: "#020617",
        borderRight: "1px solid #1e293b",
        padding: "20px 12px",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          fontSize: "13px",
          color: "#64748b",
          letterSpacing: "0.05em",
        }}
      >
        MENU
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {link("/dashboard", "Dashboard", "📊")}
        {link("/products", "Products", "📦")}
        {link("/admins", "Admins", "👤")}
      </div>
    </aside>
  );
}
