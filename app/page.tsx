"use client";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session, status } = useSession();
  if (session) {
    return <p>{session.user.username}</p>;
  }
  return (
    <main className="container">
      <p>Ekki loggaður inn</p>
    </main>
  )
}
