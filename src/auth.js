import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./db/db.js";
import { User } from "./models/userModel.js";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      async profile(profile) {
        try {
          await connectDB();
          console.log(profile);

          let signedUser = null;
          signedUser = await User.findOne({ email: profile?.email });
          console.log(signedUser?._doc);
          if (signedUser) {
            return { ...signedUser?._doc };
          }
          signedUser = await new User({
            username: profile?.name,
            img: profile?.picture,
            email: profile?.email,
            isAdmin: false,
          });
          await signedUser.save();
          return { ...signedUser?._doc };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    Credentials({
      authorize: async (credential) => {
        let user = null;
        console.log(credential);
        try {
          await connectDB();
          user = await User.findOne({ email: credential?.email });

          if (!user) {
            return null;
          }

          const { password, ...userDetails } = user._doc;

          console.log(userDetails);
          return { ...userDetails };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.isAdmin = user.isAdmin;
        token.img = user.img;
      }
      console.log("token: ", token);
      console.log("user: ", user);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.img = token.img;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
      }
      console.log("session: ", session);
      console.log("token: ", token);
      return session;
    },

    async authorized({ auth, request }) {
      console.log(auth);
      const user = auth?.user;
      const isAdminPage = request.nextUrl.pathname?.startsWith("/admin");
      const isProfilePage = request.nextUrl.pathname?.startsWith("/profile");
      const isLoginPage = request.nextUrl.pathname?.startsWith("/login");
      const isRegisterPage = request.nextUrl.pathname?.startsWith("/register");

      // ONLY AUTHANTICATED USER CAN REACH PROFILE PAGE
      if (isProfilePage && !user) return false;

      // ONNY ADMIN CAN REACH ADMINPANNEL
      if (isAdminPage && !auth?.user.isAdmin) return false;

      // UNAUTHANTICATED USER CAN REACH LOGIN PAGE
      if ((isLoginPage || isRegisterPage) && user)
        return Response.redirect(new URL("/", request.nextUrl));

      return true;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
