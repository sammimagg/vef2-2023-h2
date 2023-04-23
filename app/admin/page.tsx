import CreateEventForm from './CreateEventForm'
import { NextApiRequest, NextApiResponse } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import Events from './Events';
export default async function Page({params}: {params: { slug: string };}) {
    const { slug } = params;
    console.log(slug)
    return (
        <main className='container'>
            {/* @ts-expect-error Server Component */}
            <CreateEventForm/>
            {/* @ts-expect-error Server Component */}
            <Events/>
        </main>
    );
}