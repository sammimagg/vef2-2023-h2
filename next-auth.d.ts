import NextAuth from "next-auth"
import "next-auth/jwt"
declare module "next-auth" {
  interface User {
    id: string;
    name: string; // Add this line
    username: string;
    isAdmin: boolean;
    access_token: string;
  }

  interface Session {
    user: {
      id: string;
      name: string; // Add this line
      username: string;
      admin: boolean;
      access_token: string;

      profile_picture: string;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole: boolean
  }
}
