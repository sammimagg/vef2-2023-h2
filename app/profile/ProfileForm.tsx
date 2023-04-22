"use client";
import { useEffect, useState } from 'react';
import { setProfilePictureRequest } from '../api/user';
import PhotoBox from './photo';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfileForm(): JSX.Element {
  const { data: session } = useSession();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const id: string = session?.user.id ?? '';
  const accessToken: string = session?.user.access_token ?? '';

  useEffect(() => {
    if (session) {
      console.log(session.user.profile_picture)
      setImageUrl(session.user.profile_picture);
    }
  }, [session]);

  const handleNewProfilePicture = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!image) {
      console.log('No image selected');
      return;
    }
    setIsLoading(true);
    try {
      const response = await setProfilePictureRequest(
        id,
        accessToken,
        image
      );
      const updatedImageUrl = `${response.profile_picture}?${Date.now()}`;
      setImageUrl(updatedImageUrl);
      
      window.location.reload();
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
    <div>
      <h2>{session?.user.username}</h2>
      {/* <h2>{session?.user.name}</h2> */}
      <form onSubmit={handleNewProfilePicture}>
        <PhotoBox imageUrl={imageUrl} width={300} height={300} />
        {isLoading && <p>Loading...</p>}
        <input type="file" onChange={handleImageChange} accept="image/png, image/jpg" />        
        <button type='submit'>New profile picture</button>
      </form>
      <Link href="/">
        <button>Homepage</button>
      </Link>
    </div>
  );
}
