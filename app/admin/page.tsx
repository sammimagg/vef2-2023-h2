import CreateEventForm from './CreateEventForm'
import { NextApiRequest, NextApiResponse } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import Events from './Events';
export default async function Page({params}: {params: { slug: string };}) {
    const { slug } = params;
    return (
        <main className='container'>
            <CreateEventForm/>
            {/* @ts-expect-error Server Component */}
            <Events/>
        </main>
    );
}