'use client';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import styles from '../event.module.css'
import Link from 'next/link';
export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });
      if(response?.ok) {
      router.push('/');
      }
      if(response?.status === 401) {
        setErrorMessage("incorrect username or password");
      }

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`${error.message}`);
      }
    }
  };
  
  return (
    <form className={styles.login_signup_form} onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor="username">Username:</label>
      <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
      />
      <label htmlFor="password">Password:</label>
      <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
      />
      <button type="submit">Login</button>
      <Link href="./signup">Sign up ?</Link>
    </form>
  );
}