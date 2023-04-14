
import { useSession, signOut } from "next-auth/react";
import { User } from '../types';
import { getProviders } from "next-auth/react"
export default async function Page() {
    const { data } = useSession() 
    
    const providers = await getProviders()
    console.log(providers, data)
    return <p>Loading...</p>;
}