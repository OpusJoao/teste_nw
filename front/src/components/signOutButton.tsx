"use client";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function SignOutButton() {
  const handleSignOut = () => {
    toast.success("Deslogado com sucesso!");
    signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-red-600 hover:underline cursor-pointer"
    >
      Sign out
    </button>
  );
}
