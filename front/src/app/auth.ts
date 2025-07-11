import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await axios.post(apiUrl + '/auth/login', {
          username: credentials?.username,
          password: credentials?.password,
        });

        const user = res.data;
        if (user) {
          return {
            userId: user.userId,
            id: user.userId,
            username: user.username,
            role: user.role,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60, 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.username = user.username;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 360 * 1000; // 360s
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.userId = token?.userId;
      session.user.username = token?.username;
      session.user.role = token?.role;
      session.user.accessToken = token?.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    const res = await axios.post(apiUrl + '/auth/refresh', {
      refreshToken: token.refreshToken,
    });

    const refreshedTokens = res.data;

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + 360 * 1000, // 360s
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Erro ao fazer refresh token', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
