'use client';
import { useSession } from "next-auth/react";

import { deleteEventAPI } from "../../api/admin";
import { useRouter } from 'next/navigation';
async function deleteEvent(accessToken: string, slug: string, router: any) {
  const res = await deleteEventAPI(accessToken, slug);
  if (res) {
    return res
  }
}

export default function DeleteButton({ slug }: { slug: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    if (session) {
      const res = await deleteEvent(session.user.access_token, slug, router);
        if(res) {
            router.push(`/admin`);
        }

    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
