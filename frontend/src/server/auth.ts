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
import { User } from "@/types/user";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & User;
  }
}

const fetchUserMetadata = async (token: string) => {
  const response = await axiosInstances.default.get(
    `${Paths.default.METADATA}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("response", response);
  if (response.data.error) {
    throw new Error(response.data.message);
  }
  return response.data.payload;
};

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
            `${
              process.env.BACKEND_BASE_URL || "http://localhost:8001/api/v1"
            }/user/signin`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const { user, token } = response.data.payload;

          if (user) {
            if (credentials.remember) {
              return {
                ...user,
                expiration: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
                token,
              };
            } else {
              return { user, token };
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
    session: async ({ session, token, user, newSession }: any) => {
      // const user1 = await fetchUserMetadata(token);
      console.log("user", user, newSession, token);
      return {
        ...session,
        user: {
          id: token?.sub ?? "",
          email: session?.user?.email ?? "",
          firstName: token?.user?.firstName ?? "",
          lastName: token?.user?.lastName ?? "",
          createdAt: token?.user?.createdAt ?? "",
          updatedAt: token?.user?.updatedAt ?? "",
          title: token?.user?.title ?? "",
          description: token?.user?.description ?? "",
          profileImage: token?.user?.profileImage ?? "",
          hourlyRate: token?.user?.hourlyRate ?? 0,
          languages: token?.user?.languages ?? [],
        },
      };
    },
    jwt: ({ token, user, account, profile }) => {
      console.log("jwttt", user, account, profile, token);

      return {
        ...token,
        user: {
          ...user,
        },
      };
    },
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
