'use client';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function SignInForm() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <form>
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
            <label htmlFor='email'>Email:</label>
            <label htmlFor='Profile Picture'>Profile picture:</label>
        </form>
    )

}