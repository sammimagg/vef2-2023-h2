'use client'
import { useState } from "react";
import { createEventAPI } from "../api/admin";
import styles from './event.module.css'
import globalStyle from '../page.module.css'
import { useSession } from "next-auth/react";
import { EventInfo } from '../types';
export async function createEvent (
    accessToken:string,
    name: string,
    description: string,
    location: string,
    url: string): Promise<EventInfo | Error> {
    //accessToken, name, description, location, url: string)
    const res = await createEventAPI(accessToken,name,description,location,url);
    if(res instanceof Error) {
        return res
    }
    return res
}

export default function CreateEventForm(): JSX.Element{

    const {data: session}= useSession();
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (session) {
            const res = await createEvent(session.user.access_token, name,description,location,url)
            if (res instanceof Error) {
                setErrorMessage(res.message);
            }
            else {
              window.location.reload();
            }
          }


    }

    return (
        <div className={styles.event_card}>
            <h1>New event</h1>
            {errorMessage && <p className={globalStyle.ErrorMessage}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                value={name}
                onChange= {(e) => {setName(e.target.value)}}
                required/>
                <label>Location:</label>
                <input
                value={location}
                onChange= {(e) => {setLocation(e.target.value)}}
                required/>
                <label>URL:</label>
                <input
                value={url}
                onChange= {(e) => {setUrl(e.target.value)}}
                required/>
                <label>Description:</label>
                <textarea
                value={description}
                onChange= {(e) => {setDescription(e.target.value)}}
                required/>
                <button type='submit'>Create event</button>
            </form>
        </div>

    );
}