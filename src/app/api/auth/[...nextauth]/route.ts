import NextAuth from "next-auth";
import AuthOptions from "@/app/lib/auth";

export const authOptions = AuthOptions
// @ts-ignore
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
