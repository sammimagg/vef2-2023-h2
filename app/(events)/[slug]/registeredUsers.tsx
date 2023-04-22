
import { NextApiRequest, NextApiResponse } from 'next'
import { getEventsList, getUserRegisterToEventBySlug, isUserRegisterToEvent } from '../../api/event';
import { Event, Registration } from '../../types';
import { title } from 'process';
import Link from 'next/link';
import styles from './event.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import Image from 'next/image';
import defaultImage from '../../../public/images/default user.png';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
async function getUserRegistered(slug:string) {
  const res = await getUserRegisterToEventBySlug(slug);
  if (res instanceof Error) {
    return null
  }
  
  return res as any[];
}

export default async function UsersRegistered({ slug }: { slug: string }) {
  const session = await getServerSession(authOptions)
  const registrationList = await getUserRegistered(slug);

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
  if(profile_picture) {
    return (
      <div className={`row ${styles.comment}`}>
        <div className={`col-md-1 ${styles.col}`}>
          <img src={profile_picture} alt={name} />
        </div>
        <div className={`col-md-11 ${styles.col}`}>
          <h5>{name}</h5>
          <p>{comment}</p>
        </div>
        <hr/>
      </div>
    )
  }
  else {
    return (
      <div className={`row ${styles.comment}`}>
        <div className={`col-md-1 ${styles.col}`}>
        <Image
          src={defaultImage}
          alt={name}
          className={styles.profilePicture}
        />
        </div>
        <div className={`col-md-11 ${styles.col}`}>
          <h5>{name}</h5>
          <p>{comment}</p>
        </div>
        <hr/>
      </div>
    )
  }
}
