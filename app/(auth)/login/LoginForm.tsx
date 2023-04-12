'use client';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      
      const response = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });
      console.log(response);
      // Redirect the user to the desired page (e.g., '/dashboard') after a successful login
      //router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log("error.message")
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {error && <p>{error}</p>}
        <label htmlFor="username">Email:</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}