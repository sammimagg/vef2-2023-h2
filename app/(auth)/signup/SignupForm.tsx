'use client';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { signUpRequest } from '../../api/user';
import styles from '../event.module.css'
export default function SignupForm() {
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("reyna að signa up")
        const res =  await signUpRequest(name, username, password,email);
       
        if(res instanceof Response ) {
            const response = await signIn('credentials', {
                redirect: false,
                username,
                password,
              });
            router.push('/');
        }
        else if(res instanceof Error) {
            setErrorMessage(`User/username already exist, please try again`);
        }
    };
    return (
        <form className={styles.login_signup_form} onSubmit={handleSubmit}>
            {errorMessage && <p>{errorMessage}</p>}
            <label htmlFor="name">Name:</label>
            <input
                type="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label htmlFor='username'>Username:</label>
            <input 
                type="name"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label htmlFor='password'>Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <label htmlFor='email'>Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type='submit'>Sign Up</button>
        </form>
    )

}