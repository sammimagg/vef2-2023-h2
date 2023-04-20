import { useSession } from "next-auth/react";
import { registerForEvent } from "../api/event";
import { useState } from "react";

export default function RegisterForm() {
  const {data: session}= useSession();
  const [comment, setComment] = useState<string>("");
  const [event, setEvent] = useState<Event | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      const response = await userToEvent(event, comment);
    }
  };

  async function userToEvent(eventId: any, comment: string) {
    if (session?.user) {
      const name = session.user.username;
      registerForEvent(eventId, name, comment);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Comment:</p>
      <textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button type="submit">Register for event as {session?.user.name}</button>
    </form>
  );
}
