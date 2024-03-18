import NextAuth from "next-auth";
import AuthOptions from "@/app/lib/auth";

export const authOptions = AuthOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
