"use client";
import { useSession } from "next-auth/react";
import { registerForEvent } from "../../api/event";
import { useState } from "react";
import globalStyle from "../../page.module.css"
import { ErrorMessage } from '../../types';
import { useRouter } from "next/navigation"
export default function RegisterForm({ slug }: { slug: string }) {

    const {data: session}= useSession();
    const [comment, setComment] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    console.log(slug)
    const register = async(e: React.FormEvent) => {
      e.preventDefault();
      if (session) {
        const res = await registerForEvent(session.user.access_token, slug, "admin", comment);
        if (res instanceof Error) {
          setErrorMessage(res.message);
        }
        else {
          window.location.reload();
        }
      }
        
    }

    return (
      <form onSubmit={register}>
        {errorMessage && <p className={globalStyle.ErrorMessage}>{errorMessage}</p>}
        <p>Comment:</p>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button type="submit">Register for event </button>
        
      </form>
    );
}
