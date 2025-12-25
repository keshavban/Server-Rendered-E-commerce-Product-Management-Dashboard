import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-4 mt-6">
  <Link href="/" className="hover:text-gray-300">Dashboard</Link>
  <a href="/products" className="hover:text-gray-300">Products</a>
  <a href="/admins" className="hover:text-gray-300">Admins</a>
</nav>

    </aside>
  );
}
