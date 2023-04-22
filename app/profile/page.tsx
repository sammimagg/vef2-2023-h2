
import Nav from "../nav";
import ProfileForm from "./ProfileForm";

import 'bootstrap/dist/css/bootstrap.css'
export default function ProfilePage() {
    return (
        <main className='container'>
            {/* @ts-expect-error Server Component */}
            <Nav/>
            {/* @ts-expect-error Server Component */}
            <ProfileForm/>
        </main>

    );
}