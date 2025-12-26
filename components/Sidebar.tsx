import Link from "next/link";
import type { Session } from "next-auth";

type SidebarProps = {
  session: Session | null;
};

export default function Sidebar({ session }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r p-6">
      <nav className="space-y-4">
        <Link href="/dashboard" className="block hover:underline">
          Dashboard
        </Link>

        <Link href="/products" className="block hover:underline">
          Products
        </Link>

        {session?.user?.role === "SUPER_ADMIN" && (
          <Link
            href="/admins"
            className="block hover:underline text-red-600"
          >
            Admin Management
          </Link>
        )}
      </nav>
    </aside>
  );
}
