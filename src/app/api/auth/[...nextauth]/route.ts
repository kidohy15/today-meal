import NextAuth from "next-auth";
import authOptions from "./options"; 
// import { handlers, authOptions as AuthOptions } from "@/app/api/auth/[...nextauth]/options";
// import { handler } from "@/lib/auth"

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
