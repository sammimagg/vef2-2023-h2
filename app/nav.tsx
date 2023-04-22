import { getServerSession } from "next-auth/next";
import LogOut from "./Logout-btn"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import styles from "./page.module.css"
import Link from "next/link";
export default async function NavBar() {

    const session = await getServerSession(authOptions)
    if(session) {
        return (
            <nav className={styles.userNav}>
                <p>{session.user.name}</p>
                <Link className="profileLink" href="profile">
                    Profile page
                </Link>
                <LogOut/>
            </nav>
        );
    }
    return null
}

