"use client";
import { useSession } from "next-auth/react";
import { getEventBySlug, registerForEvent } from "../../api/event";
import { useEffect, useState } from "react";
import globalStyle from "../../page.module.css"
import { ErrorMessage, EventInfo } from '../../types';
import { useRouter } from "next/navigation"
import { updateEventAPI } from "../../api/admin";

export default function UpdateForm({ slug }: { slug: string }) {
    const { data: session } = useSession();
    const [event, setEvent] = useState<EventInfo | null>(null);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
      const fetchEvent = async () => {
        const eventInfo: EventInfo = await getEventBySlug(slug);
        if(event) {
          const event: EventInfo = {
            id: eventInfo.id,
            name: eventInfo.name,
            location: eventInfo.location,
            url: eventInfo.url,
            description: eventInfo.description,
          };
              setEvent(event);
          setName(event.name);
          setDescription(event.description);
          setLocation(event.location);
          setUrl(event.url);
        }

      };
      fetchEvent();
    }, []);
  
    const update = async (e: React.FormEvent) => {
      e.preventDefault();
      if (session) {
        const res = await updateEventAPI(
          session.user.access_token,
          slug,
          name,
          description,
          location,
          url
        );
        console.log(res);
        if (res instanceof Error) {
          setErrorMessage(res.message);
        } else {
            router.push(`/admin/${name}`);
        }
      }
    };
  
    return (
      <form onSubmit={update}>
        {errorMessage && (
          <p className={globalStyle.ErrorMessage}>{errorMessage}</p>
        )}
        <p>Comment:</p>
        {event && (
          <>
            <label>Name:</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <label>Location:</label>
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              required
            />
            <label>Url:</label>
            <input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              required
            />
            <label>Description:</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <button type="submit">Create new event </button>
          </>
        )}
      </form>
    );
  }
  