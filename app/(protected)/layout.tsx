import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen">
        <Topbar />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
