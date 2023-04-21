
import { NextApiRequest, NextApiResponse } from 'next'
import { getEventsList, getUserRegisterToEventBySlug } from '../../api/event';
import { Event, Registration } from '../../types';
import { title } from 'process';
import Link from 'next/link';
import styles from './event.module.css'
import 'bootstrap/dist/css/bootstrap.css'

async function getUserRegistered(slug:string) {
  const res = await getUserRegisterToEventBySlug("forritarahittingur-i-februar");
  if (res instanceof Error) {
    return null
  }
  
  return res as any[];
}

export default async function UsersRegistered({ slug }: { slug: string }) {
  const registrationList = await getUserRegistered("forritarahittingur-i-februar");
  
  if (registrationList) {
    return (
      <div className="col-12">
        <h1>Registered to event</h1>
        <section className='col colum'>
          {Array.isArray(registrationList) &&
            registrationList.map((registered) => {
              return <UserRegistered key={registered.id} registered={registered} />;
            })}
        </section>
      </div>
    )
  }
  else return <></>
}

function  UserRegistered({ registered }: { registered: Registration }) {
  const { id, name, username, profile_picture, comment } = registered;
  
  return (
    <div >
        <h5>{name}</h5>
        <p>{username}</p>
        <p>{profile_picture}</p>
        <p>{comment}</p>

    </div>
  )
}
