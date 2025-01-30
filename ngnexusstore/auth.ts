import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

const config: NextAuthConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) {
          return null;
        }

        //   find user in the database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        //   check if the password matches
        if (user && user.password) {
          const isPasswordMatched = compareSync(
            credentials.password as string,
            user.password
          );
          //   if password is matched we want to return the user
          if (isPasswordMatched) {
            return {
              id: user.id,
              name: user.name,
              role: user.role,
              email: user.email,
            };
          }
        }

        //   if user not found or password doesn't match return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token, trigger }) {
      session.user.id = token.sub!;

      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(config);
