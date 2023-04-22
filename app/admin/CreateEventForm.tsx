'use client'
import { useState } from "react";
import { newEventRequest } from "./createEvent";
import { createEvent } from "../api/admin";

export default function CreateEventForm(): JSX.Element{
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    let created = Date();
    let updated = Date();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Reyna að búa til nýtt event");
        const res = await newEventRequest(id, name, slug, location, url, description, created, updated);
        if(res instanceof Response){
            await createEvent(name, description, location, url, slug);
        } else {
            console.error(e)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Event:</h2>
                <textarea
                value={name}
                onChange= {(e) => {setName(e.target.value)}}
                required/>
            </div>
            <div>
                <h2>Description:</h2>
                <textarea
                value={description}
                onChange= {(e) => {setDescription(e.target.value)}}
                required/>
            </div>
            <div>
                <h2>Location:</h2>
                <textarea
                value={location}
                onChange= {(e) => {setLocation(e.target.value)}}
                required/>
            </div>
            <div>
                <h2>URL:</h2>
                <textarea
                value={url}
                onChange= {(e) => {setUrl(e.target.value)}}
                required/>
            </div>
            <button type='submit'>Create event</button>
        </form>
    );
}