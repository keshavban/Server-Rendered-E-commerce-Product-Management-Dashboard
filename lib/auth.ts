import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
  console.log("AUTH ATTEMPT:", credentials?.email);

  if (!credentials?.email || !credentials.password) {
    console.log("❌ Missing credentials");
    return null;
  }

  await connectDB();

  const admin = await Admin.findOne({ email: credentials.email });
  console.log("ADMIN FOUND:", admin);

  if (!admin) {
    console.log("❌ No admin with this email");
    return null;
  }

  const isValid = await bcrypt.compare(
    credentials.password,
    admin.password
  );

  console.log("PASSWORD MATCH:", isValid);

  if (!isValid) {
    console.log("❌ Password mismatch");
    return null;
  }

  console.log("✅ AUTH SUCCESS");

  return {
    id: admin._id.toString(),
    email: admin.email,
    role: admin.role,
  };
}

    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
  if (user && "role" in user) {
    token.role = user.role;
  }
  return token;

    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "ADMIN" | "SUPER_ADMIN";
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
