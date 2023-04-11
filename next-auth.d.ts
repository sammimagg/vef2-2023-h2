import NextAuth from "next-auth"

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
        id: string;
        username: string;
        isAdmin: boolean;
        access_token: string;
        token_type: string;
        expires_in: number;
    }
  }
}
