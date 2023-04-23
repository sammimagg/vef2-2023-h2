import { getEventsList } from '../api/event';
import { Event } from '../types'
import Link from 'next/link';
import styles from './event.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

async function getEvents() {
    const res=  await getEventsList();
    return res as any[];
}

export default async function Events() {
    const events = await getEvents();
    const session = await getServerSession(authOptions)
    return (
        <div className="col-12">
            <h1>Upcoming events</h1>
            {!session ? (
                <><Link href="/login">
                    <button>Log in</button>
                </Link>
                <Link href="/signup">
                    <button>Sign up</button>
                </Link></>
            ) : null}
            <section className='col colum'>
            {Array.isArray(events) &&
            events.map((event) => {
                return <Event key={event.id} event={event} />;
            })}
            </section>
        </div>
    )
}
function Event({ event }: { event: Event }){
    const { id, slug, name,description,location,url } = event;

    return (
        <div className={styles.event_card}>
            <Link href={`/${slug}`}>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Location:{location}</p>
            <p>Slóð:{url}</p>
            </Link>
        </div>
    )
}
