import type { ReactNode } from "react";
import ProtectedLayout from "@/components/ProtectedLayout";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function ProtectedAppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedLayout>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedLayout>
  );
}
