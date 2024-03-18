import NextAuth, { NextAuthOptions, AuthOptions  } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import authOptions from "@/app/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
