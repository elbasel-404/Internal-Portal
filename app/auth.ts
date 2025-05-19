import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // authorized: ({ auth, request }) => {
    //   return !!auth;
    // },
    session: ({ token, newSession, session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          testUserProp: "testProp",
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: () => {
        return {
          username: "username",
          id: "101",
        };
      },
    }),
  ],
});
