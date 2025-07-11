'use server'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return undefined;
  //
  return { ...session?.user };
}
export async function requireUser(redirectTo?: string) {
  const user = await getCurrentUser();
  if (user) return user;
  let loginUrl = '/login';
  if (redirectTo) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    loginUrl = `/login?${searchParams}`;
  }
  redirect(loginUrl);
}
