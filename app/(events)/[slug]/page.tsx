import { getEventBySlug, isUserRegisterToEvent, registerForEvent } from '../../api/event';
import { Event } from "../../types";
import styles from './event.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import UsersRegistered from "./registeredUsers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import Nav from "../../nav";
import RegisterForm from "./RegisterForm";
import UnregisterButton from './Unregister';

async function getEvent(slug: string): Promise<Event> {
    const res = getEventBySlug(slug);
    const data = await res;
    return data as Event
}
async function isRegistered(accessToken:string, slug:string,id:string) {
  const res = await isUserRegisterToEvent(accessToken,slug,id)
  if(res) {
    return true
  }
  else {
    return false
  }
}

export default async function EventPage({params}: {params: { slug: string };}) {
    const { slug } = params;
    const event = await getEvent(slug);
    const session = await getServerSession(authOptions)
    
    if(session) {
      const registered = await isRegistered(session?.user.access_token,slug,session.user.id) 
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
              {registered && <UnregisterButton slug={slug}/>}
              {!registered && <RegisterForm slug={slug}/>}  
              {/* @ts-expect-error Server Component */}
              <UsersRegistered slug={slug}/>    
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