import "server-only";
import { requireUser } from "@/app/session.server";
import { redirect } from "next/navigation";
import PrivateLayout from "../(protected)/layout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    <PrivateLayout>
      {children}
    </PrivateLayout>
  )
}
