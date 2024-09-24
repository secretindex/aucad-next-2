import NextAuth from "next-auth/next"
import Google from "next-auth/providers/google"

import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user!.name = token.sub
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }
