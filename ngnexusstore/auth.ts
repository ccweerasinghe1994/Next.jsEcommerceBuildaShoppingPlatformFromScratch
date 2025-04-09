import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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
    async session({ session, user, token, trigger }: any) {
      session.user.id = token.sub!;
      session.user.name = token.name;
      session.user.role = token.role;

      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;

        //  if user doesn't have a name add the email first part as name
        if (user.name === "NO_NAME") {
          token.name = user.email?.split("@")[0];

          await prisma.user.update({
            where: {
              id: user.id!,
            },
            data: {
              name: token.name,
            },
          });
        }
      }

      return token;
    },
    authorized({ request, auth }: any) {
      // check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        // generate sessionCartId
        const sessionCartId = crypto.randomUUID();

        // clone the request headers
        const newRequestHeaders = new Headers(request.headers);

        // const create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        // set the newly created sessionCartId to the response
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(config);
