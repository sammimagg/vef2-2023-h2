import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import LogOut from "./Logout-btn"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import styles from "./page.module.css"
import Link from "next/link";
export default async function NavBar() {

    const session = await getServerSession(authOptions)

    console.log(session)
    if(session) {
        return (
            <nav className={styles.userNav}>
                <p>{session.user.name}</p>
                <Link href="profile">
                    <button>Profile page</button>
                </Link>
                <LogOut/>
            </nav>
        )

        
    }
    return null
}

