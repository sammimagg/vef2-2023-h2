
import 'bootstrap/dist/css/bootstrap.css'
import Events from './events'
import NavBar from '../nav'

export default  function Page() {
    return (
        <main className='container'>
            {/* @ts-expect-error Server Component */}
            <NavBar />
             {/* @ts-expect-error Server Component */}
            <Events/>

        </main>
    )
}