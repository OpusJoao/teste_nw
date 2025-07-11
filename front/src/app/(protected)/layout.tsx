import "server-only";
import { requireUser } from "@/app/session.server";
import { Toaster } from "react-hot-toast";
import SignOutButton from "@/components/signOutButton";
import Link from "next/link";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full flex justify-between items-center p-4 bg-white shadow">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Bem-vindo, {user.username}!</h1>
          {user.role === "admin" && (
            <Link href="/" className="hover:underline text-sm">
              Tarefas
          </Link>
          )}
          {user.role === "admin" && (
            <Link href="/admin" className="hover:underline text-sm">
              Ir para Admin
            </Link>
          )}
          {user.role === "admin" && (
            <Link href="/register" className="hover:underline text-sm">
              Novo usuário
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          <SignOutButton />
        </div>
      </header>

      <main className="p-4">{children}</main>
      <Toaster position="bottom-right" />
    </div>
  );
}
