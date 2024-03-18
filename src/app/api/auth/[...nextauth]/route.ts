import NextAuth, { NextAuthOptions, AuthOptions  } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface User {
  id: number;
  email: string;
  password?: string;
  name?: string;
  emailVerified?: Date;
  image?: string;
}

async function login(credentials: User) {
  const email = credentials.email;
  const password = credentials.password;
  try {
    const res = await prisma.user.findFirst({
      where: {
        email: email,
        // 암호화된 비번과 where 절 비교를 하기 때문에 여기서 password 비교하면 계속 null 나오기 때문에 밑에서 비교
        // password: password,
      },
    });

    if (!res) throw new Error("Wrong Credentials");
    const correct = await bcrypt.compare(
      credentials?.password as string,
      res?.password as string
    );

    if (!correct) throw new Error("Wrong Credentials");
    return res;
  } catch (error) {
    console.log("login error");
    throw new Error("error");
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2,
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // 서비스 자체 회원 로그인
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials: any) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.log("Error: ", error);
          throw new Error("Wrong Credentials");
        }
      },
    }),
  ],

  pages: {
    // 외부 API 로그인 인증 페이지를 커스텀 페이지로 이동하게 함
    signIn: "/users/login",
  },

  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
