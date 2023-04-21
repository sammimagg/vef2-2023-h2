import { getEventBySlug, registerForEvent } from "../../api/event";
import { Event } from "../../types";
import styles from './event.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import RegisterForm from "../RegisterForm";
import UsersRegistered from "./registeredUsers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import Nav from "../../nav";

async function getEvent(slug: string): Promise<Event> {
    const res = getEventBySlug(slug);
    const data = await res;
    return data as Event
}

export default async function EventPage({params}: {params: { slug: string };}) {
    const { slug } = params;
    const event = await getEvent(slug);
    const session = await getServerSession(authOptions)
    
    if(session) {
      return (
        <main className="container">
          {/* @ts-expect-error Server Component */}
            <Nav/>
            <div className={styles.event_card}>
                <h1>{event?.name}</h1>
                <p>{event?.description}</p>
                <p>{event?.location}</p>
                <a href={event?.url}/>

            </div>
            <div className={styles.event_card}>
              <RegisterForm/>      
              {/* @ts-expect-error Server Component */}
              <UsersRegistered/>    
            </div>
        </main>
      )
    }
    else {
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
}