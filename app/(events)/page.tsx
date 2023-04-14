
import { NextApiRequest, NextApiResponse } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import Events from './events'
export default  function Page() {
    return (
        <main className='container'>
            {/* @ts-expect-error Server Component */}
            <Events/>
        </main>
    )
}