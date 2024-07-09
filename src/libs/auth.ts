import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./server";

export const config: NextAuthConfig = {
  theme: {
    logo: "http://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  basePath: "/api/auth",
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async authorized({ request, auth }) {
      try {
        const { pathname } = request.nextUrl;
        if (pathname === "/protected-page") return !!auth;
        return true;
      } catch (err) {
        console.log(err);
      }
    },
    async jwt({ token, trigger }) {
      if (!token.email) return token;

      const user = await prisma.user.findFirst({
        where: { email: token.email },
      });

      if (!user) return token;
      return {
        ...token,
        id: user.id,
        username: user.name,
        gmail: user.email,
        image: user.image,
      };
    },
    async session({ session, token }) {
      if (token && typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
