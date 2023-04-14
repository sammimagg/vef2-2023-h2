import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { User } from './app/types';
import jwtDecode from "jwt-decode";
import { DecodedToken } from './app/types'
export default withAuth(
  function middleware(req) {
    if (!req.nextauth || !req.nextauth.token) {
        // Redirect to the custom login page if the user is not authenticated
        return NextResponse.redirect('/login');
    } 

    // Check if the access_token property exists before decoding it
    if (req.nextauth.token.access_token) {
        const decodedToken = jwtDecode(req.nextauth.token.access_token as string) as DecodedToken;
        console.log("Decoded token:", decodedToken);
        if (req.nextUrl.pathname === "/admin" && !decodedToken.admin) {
          return new NextResponse("You are not authorized!");
        }
    }
  },
  {
    callbacks: {
        authorized: (params) => {
            let { token } = params;
            return !!token;
        },
    },
  }
);
export const config = { matcher: ["/admin"] };