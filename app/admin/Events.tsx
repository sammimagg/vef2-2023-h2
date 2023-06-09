import { getEventsList } from '../api/event';
import { Event } from '../types'
import Link from 'next/link';
import styles from './event.module.css'
import 'bootstrap/dist/css/bootstrap.css'
async function getEvents() {
    const res=  await getEventsList();
    return res as any[];
}
export default async function Events() {
    const events = await getEvents();
    return (
        <div className="col-12">
            <h1>Edit events</h1>
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
            <Link href={`/admin/${slug}`}>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Location:{location}</p>
            <p>Slóð:{url}</p>
            </Link>
        </div>
    )
}
