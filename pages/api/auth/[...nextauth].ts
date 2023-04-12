import NextAuth from 'next-auth';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import { User } from '../../../app/types';
import { use } from 'react';
interface ExtendedJWT extends JWT {
  access_token?: string;
  isAdmin?: boolean;
}

interface ExtendedSession extends Session {
  access_token?: string;
  isAdmin?: boolean;
}


export default NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const {username, password} = credentials as any;
            // Add logic here to look up the user from the credentials supplied
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            const user = await response.json();

            if(response.ok && user) {
       
              return user;
            }
            else {
              return null;
            }
          }
        })
      ],
      session: {
        strategy:"jwt",
      },
      jwt: {
        secret: process.env.JWT_SECRET, // Make sure to define JWT_SECRET in your .env file
    },
    callbacks: {
      async jwt({ token, user, ...rest }): Promise<ExtendedJWT> {
        if (token && user) {
          // Set access token and isAdmin flag in JWT token
          token.access_token = user.access_token;

        }
        return token;
      },
      async session({ session, token, ...rest }): Promise<ExtendedSession> {
        
        if (token && token.access_token) {
          // Fetch user data from REST API server using access token
          console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
          const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            // Add user data to session
            session = { ...userData };
          }
        }
        return session;
      },
      
  },
});