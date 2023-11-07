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

const fetchUserInfo = async (email: string) => {
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });
  // let printers: any = [];
  // let quotes: any = [];
  // if (user?.role === "ENDUSER") {
  //   quotes = await prisma.quote.findMany({
  //     where: {
  //       userId: user?.id,
  //       is_bought: false,
  //     },
  //   });
  // } else {
  //   let printers = await prisma.printer.findMany({
  //     where: {
  //       owner_id: user?.id,
  //     },
  //   });
  // }
  // return {
  //   user,
  //   quotes,
  //   printers,
  // };
  return {};
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      type: "credentials",
      id: "credentials",
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please provide both email and password!");
        }

        const user = await axiosInstances.default.post(Paths.default.LOGIN, {
          email: credentials?.email,
          password: credentials?.password,
        });

        return user.data;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      console.log("user", user, account, profile);
      // await axiosInstances.default.post(Paths.default.LOGIN, {
      //   email: user?.email,
      //   password: user?.password,
      // });
      return true;
    },
    session: async ({ session, user, token }: any) => {
      const newUser = await fetchUserInfo(session?.user.email);

      return {
        ...session,
        user: {
          // id: newUser?.user?.id ?? "",
          // email: newUser?.user?.email ?? "",
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
