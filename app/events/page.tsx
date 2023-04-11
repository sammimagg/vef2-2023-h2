"use client";
import { useSession, signOut } from "next-auth/react";
import { User } from '../types';

export default function Page() {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  
  if (!session) {
    return <p>You are not logged in</p>;
  }
  
  console.log(session);
}