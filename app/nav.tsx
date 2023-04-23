import { getServerSession } from "next-auth/next";
import LogOut from "./Logout-btn"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import styles from "./page.module.css"
import Link from "next/link";
import defaultImage from'../public/images/default user.png'
import { useSession } from "next-auth/react";

export default async function NavBar() {

    const session = await getServerSession(authOptions)
    if(session?.user.admin){
        return (
            <nav className={styles.userNav}>
                <div>
                    <img 
                        src={session.user.profile_picture} 
                        alt={session.user.name} 
                        className={styles.adminPicture}
                        />
                    <p>{session.user.name}</p>
                </div>
                <Link href={"/"} className={styles.homePageLink}>Home page</Link>
                <Link href={"/admin"} className={styles.adminPageLink}>Admin panel</Link>
                <LogOut/>
            </nav>
        );
    }
    else if(session) {
        return (
            <nav className={styles.userNav}>
                <p>{session.user.name}</p>
                <Link className={styles.profileLink} href="profile">
                    Profile page
                </Link>
                <LogOut/>
            </nav>
        );
    }
    return null
}

