
import Link from "next/link";
import Nav from "../nav";
import ProfileForm from "./ProfileForm";

import 'bootstrap/dist/css/bootstrap.css'
export default function ProfilePage() {
    return (
        <main className='container'>
            {/* @ts-expect-error Server Component */}
            <Nav/>
            <ProfileForm/>
            <Link href="/">
                <button>Home page</button>
            </Link>
        </main>

    );
}