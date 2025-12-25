import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      role?: "ADMIN" | "SUPER_ADMIN";
    };
  }

  interface User {
    role?: "ADMIN" | "SUPER_ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "SUPER_ADMIN";
  }
}
