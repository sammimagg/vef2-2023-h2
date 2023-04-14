"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";


export default function Component({ children }: { children?: React.ReactNode }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <pre>{JSON.stringify(session, null, 2)}</pre>
        {/* <UserInformation data={session.user} /> */}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  // If there is a session, don't render anything
  return null;
}

