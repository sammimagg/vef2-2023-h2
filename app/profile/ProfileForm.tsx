"use client";
import { useEffect, useState } from 'react';
import { setProfilePictureRequest, updateProfile } from '../api/user';
import PhotoBox from './photo';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Nav from '../nav';
import { error } from 'console';

export default function ProfileForm(): JSX.Element {
  const { data: session } = useSession();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(session?.user.username ?? '');
  const [name, setName] = useState(session?.user.name ?? '');  
  const id: string = session?.user.id ?? '';
  const accessToken: string = session?.user.access_token ?? '';

  useEffect(() => {
    if (session) {
      console.log(session.user.profile_picture)
      setImageUrl(session.user.profile_picture);
      setName(session.user.name)
      setUsername(session.user.username)
    }
  }, [session]);

  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setIsLoading(true);
  
    try {
      // Update profile picture if an image is selected
      if (image) {
        console.log("img insert")
        const response = await setProfilePictureRequest(id, accessToken, image);
        const updatedImageUrl = `${response.profile_picture}?${Date.now()}`;
        setImageUrl(updatedImageUrl);
      }
  
      // Update the username and name
      if(session){
        console.log('Updating profile with:', {
          accessToken: session.user.access_token,
          id: session.user.id,
          username: username,
          name: name,
        }); // Add this line
        const res = await updateProfile(session.user.access_token,session.user.id, username, name);
        setUsername(username)
        setName(name)
      }
      
      // Handle the response as needed, e.g., show a success message or update the session data
  
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      
    }
  };
  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file || null);
  };
  
  return (
    <>
      <form onSubmit={handleUpdateProfile}>
        <PhotoBox imageUrl={imageUrl} width={300} height={300} />
        {isLoading && <p>Loading...</p>}
        <input type="file" onChange={handleImageChange} accept="image/png, image/jpg" />
        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>Update profile</button>
      </form>
    </>
  );
}
