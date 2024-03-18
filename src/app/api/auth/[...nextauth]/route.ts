import NextAuth from "next-auth";
import { handlers, authOptions as AuthOptions } from "@/app/lib/auth";
// import { handler } from "@/lib/auth"

export { handlers as GET, handlers as POST }

export const authOptions = AuthOptions
// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST };
