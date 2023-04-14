import NextAuth from "next-auth"
import "next-auth/jwt"
declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    isAdmin: boolean;
    access_token: string;
    token_type: string;
    expires_in: number;
  }

  interface Session {
    user: {
        email: any;
        id: string;
        username: string;
        isAdmin: boolean;
        access_token: string;
        token_type: string;
        expires_in: number;
    }
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole: boolean
  }
}
