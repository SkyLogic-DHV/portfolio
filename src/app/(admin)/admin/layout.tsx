import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminShell from "./AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side guard: direct visits to /admin/* without a valid session
  // are redirected to the login page before any admin content is rendered.
  const session = await getAdminSession();
  if (!session) {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}