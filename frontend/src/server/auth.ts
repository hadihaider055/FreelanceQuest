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
import Swal from "sweetalert2";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
    token: string;
  }
}

// const fetchUserMetadata = async (email: string) => {
//   const response = await axiosInstances.auth.get(Paths.default.METADATA(email));

//   if (response.data.error) {
//     Swal.fire({
//       title: "Error!",
//       text: response.data.message || "Something went wrong!",
//       icon: "error",
//     });
//   }
//   return response.data.payload;
// };

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
      async authorize(
        credentials,
        req
      ): Promise<
        | (User & {
            token: string;
          })
        | null
      > {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please provide both email and password!");
        }

        try {
          const response = await axiosInstances.auth.post(Paths.default.LOGIN, {
            email: credentials.email,
            password: credentials.password,
          });

          const { user, token } = response.data.payload;

          if (user) {
            if (credentials.remember) {
              return {
                ...user,
                expiration: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
                token,
              };
            } else {
              return { ...user, token };
            }
          } else {
            return null;
          }
        } catch (err: any) {
          console.log(err);
          throw new Error(
            err?.response?.data?.message || "Something went wrong!"
          );
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: any) => {
      // const { user } = await fetchUserMetadata(token.email);
      return {
        ...session,
        user: {
          id: token?.sub ?? "",
          email: session?.user?.email ?? "",
          firstName: token?.firstName ?? "",
          lastName: token?.lastName ?? "",
          createdAt: token?.createdAt ?? "",
          updatedAt: token?.updatedAt ?? "",
          title: token?.title ?? "",
          description: token?.description ?? "",
          profileImage: token?.profileImage ?? "",
          hourlyRate: token?.hourlyRate ?? 0,
          languages: token?.languages ?? [],
          category: token?.category ?? "",
          role: token?.role ?? "",
        },
        token: token?.token ?? "",
      };
    },
    jwt: ({ token, user }) => {
      return { ...token, ...user };
    },
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
