import NextAuth from "next-auth";
import AuthOptions from "@/app/lib/auth";

// @ts-ignore
export const authOptions = AuthOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
