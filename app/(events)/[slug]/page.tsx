"use client"
import { useEffect, useState } from "react";
import { getEventBySlug } from "../../api/event";
import { Event } from "../../types";
import Link from "next/link";
import styles from './event.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useSession } from "next-auth/react";
async function getEvent(slug: string): Promise<Event> {
    const res = getEventBySlug(slug);
    const data = await res;
    return data as Event
}
export default  function EventPage({params}: {params: { slug: string };}) {
    const { slug } = params;
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        async function fetchEvent() {
          const data = await getEventBySlug(slug);
          if (data instanceof Error) {
            // handle error
          } else {
            setEvent(data);
          }
        }
        fetchEvent();
      }, [slug]);
    return (
        <main className="container">
            <div className={styles.event_card}>
                <h1>{event?.name}</h1>
                <p>{event?.description}</p>
                <p>{event?.location}</p>
                <a href={event?.url}/>
            </div>
        </main>

    )
}