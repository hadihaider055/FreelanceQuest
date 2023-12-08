import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstances from "@/config/axios";
import { Paths } from "@/config/Paths";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
    };
  }

  interface User {
    id: string;
    email: string;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "FreelanceQuest",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember me", type: "checkbox" },
      },
      type: "credentials",
      id: "credentials",
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please provide both email and password!");
        }

        try {
          const response = await axiosInstances.default.post(
            "http://localhost:8001/api/v1/user/signin",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const { user, token } = response.data.payload;

          if (user) {
            if (credentials.remember) {
              return {
                id: user.id,
                email: user.email,
                expiration: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
              };
            } else {
              return user;
            }
          } else {
            return null;
          }
        } catch (err: any) {
          throw new Error(
            err?.response?.data?.message || "Something went wrong!"
          );
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }: any) => {
      return {
        ...session,
        user: {
          id: token?.sub ?? "",
          email: session?.user?.email ?? "",
        },
      };
    },
    jwt: ({ token }) => {
      return token;
    },
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
