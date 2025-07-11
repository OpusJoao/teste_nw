"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import api from "../../../../lib/api";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  async function handleAction(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const role = formData.get("role") as string;

    // Validações locais
    const newErrors: { [key: string]: string } = {};

    if (!username || username.trim().length < 3) {
      newErrors.username = "O username deve ter pelo menos 3 caracteres.";
    }

    if (!password || password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "A senha deve conter pelo menos uma letra maiúscula.";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "A senha deve conter pelo menos uma letra minúscula.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "A senha deve conter pelo menos um número.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    if (!role || (role !== "user" && role !== "admin")) {
      newErrors.role = "Selecione uma role válida.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await api.post("/users/register", {
        username,
        password,
        role,
      });

      if (res.status !== 200 && res.status !== 201) {
        const data = res.data;
        setErrors({ other: data.message || "Erro ao registrar." });
        return;
      }

      toast.success("Registro feito com sucesso!");
      router.replace(redirectTo);
    } catch (error) {
      console.error(error);
      toast.error("Erro inesperado ao registrar.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <form className="space-y-6" action={handleAction}>
          <fieldset>
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <div className="flex flex-col gap-4 items-center">
              {errors?.other ? (
                <div className="text-red-500">{errors.other}</div>
              ) : null}

              <label className="w-full flex flex-col items-start">
                <span className="mb-1 text-slate-950 dark:text-slate-100">Username</span>
                <input
                  name="username"
                  placeholder="Digite seu username"
                  required
                  autoFocus
                  type="text"
                  autoComplete="username"
                  aria-describedby="username-error"
                  className="w-full bg-transparent border border-slate-300 dark:border-slate-700 p-2 rounded-md"
                />
                {errors.username && (
                  <span id="username-error" className="text-red-500 text-sm">
                    {errors.username}
                  </span>
                )}
              </label>

              <label className="w-full flex flex-col items-start">
                <span className="mb-1 text-slate-950 dark:text-slate-100">Senha</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  required
                  autoComplete="new-password"
                  aria-describedby="password-error"
                  className="w-full bg-transparent border border-slate-300 dark:border-slate-700 p-2 rounded-md"
                />
                {errors.password && (
                  <span id="password-error" className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </label>

              <label className="w-full flex flex-col items-start">
                <span className="mb-1 text-slate-950 dark:text-slate-100">Confirme a Senha</span>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  required
                  autoComplete="new-password"
                  aria-describedby="confirm-password-error"
                  className="w-full bg-transparent border border-slate-300 dark:border-slate-700 p-2 rounded-md"
                />
                {errors.confirmPassword && (
                  <span id="confirm-password-error" className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </label>

              <label className="w-full flex flex-col items-start">
                <span className="mb-1 text-slate-950 dark:text-slate-100">Role</span>
                <select
                  name="role"
                  defaultValue=""
                  aria-describedby="role-error"
                  className="w-full bg-transparent border border-slate-300 dark:border-slate-700 p-2 rounded-md"
                >
                  <option value="" disabled>
                    Selecione a role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <span id="role-error" className="text-red-500 text-sm">
                    {errors.role}
                  </span>
                )}
              </label>

              <button
                type="submit"
                aria-label="Registrar"
                className="w-full bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 transition-colors"
              >
                Registrar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
