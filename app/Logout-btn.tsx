"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";


export default function LogOut({ children }: { children?: React.ReactNode }) {
 
    return (        <button onClick={() => signOut()}>Sign out</button>    );
}

