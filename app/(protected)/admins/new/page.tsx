// app/(protected)/admins/new/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewAdminForm from "./NewAdminForm";

export default async function NewAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user.role !== "SUPER_ADMIN") {
    redirect("/admins");
  }

  return <NewAdminForm />;
}
