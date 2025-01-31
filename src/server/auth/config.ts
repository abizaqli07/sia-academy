import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";
import authDefaultConfig from "./auth.config";

import { db } from "~/server/db";
import {
  accounts,
  users,
  verificationTokens,
} from "~/server/db/schema";
import { sessions } from "../db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "USER" | "MENTOR" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    role: "USER" | "MENTOR" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "USER" | "MENTOR" | "ADMIN";
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user.role;
      if (user) token.id = user.id!;
      return token;
    },
    session: async ({ session, token }) => {
      session = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },

  ...authDefaultConfig,
} satisfies NextAuthConfig;
