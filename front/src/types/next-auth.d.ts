import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User
  }

  interface User extends DefaultUser {
    userId: number;
    username: string;
    accessToken: string;
    refreshToken: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number;
    username: string;
    accessToken: string;
    refreshToken: string;
    role: string;
  }
}
