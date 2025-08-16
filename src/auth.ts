import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import dbConnect from "./lib/db";
import User from "./models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub,
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await dbConnect();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
          });
          console.log(`User Created!`);
        } else {
          console.log("User Already Exist");
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
  secret: process.env.AUTH_SECRET,
});
