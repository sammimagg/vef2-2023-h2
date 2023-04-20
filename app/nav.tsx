import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import LogOut from "./Logout-btn"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import styles from "./page.module.css"
export default async function NavBar() {

    const session = await getServerSession(authOptions)

    console.log(session)
    if(session) {
        return (
            <nav className={styles.userNav}>
                <p>{session.user.name}</p>
                <LogOut/>
            </nav>
        )

        
    }
    return null
}

