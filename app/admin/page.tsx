import CreateEventForm from './CreateEventForm'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function Page() {
    return (
        <div>
            <CreateEventForm/>
        </div>
    );
}