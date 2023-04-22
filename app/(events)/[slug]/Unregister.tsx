"use client";
import { useSession } from "next-auth/react";
import { unregisterUserToEvent } from "../../api/event";

export default function UnregisterButton({ slug }: { slug: string }) {
  const { data: session } = useSession();

  const unregisterHandler = async () => {
    try {
      if (session) {
        const res = await unregisterUserToEvent(session.user.access_token, slug, session.user.id);
        if (res) {
            window.location.reload();
        } else {
          console.error("Failed to unregister user from event");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={unregisterHandler}>Unregister from event</button>;
}
