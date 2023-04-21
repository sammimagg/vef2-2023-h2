import { useState } from 'react';
import { setProfilePictureRequest } from '../api/user';
import PhotoBox from './photo';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfileForm(): JSX.Element {
  const {data: session} = useSession();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const id: string = session?.user.id ?? '';
  const accessToken: string = session?.user.access_token ?? '';

  const handleNewProfilePicture = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await setProfilePictureRequest(
        id,
        accessToken,
        imageUrl
      );
      setImageUrl(response.profile_picture);
      console.log(imageUrl)
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file || null);
  };
  
  return (
    <div>
      <h2>{session?.user.username}</h2>
      <form onSubmit={handleNewProfilePicture}>
        <PhotoBox imageUrl={imageUrl} width={300} height={300} />
        <input type="file" onChange={handleImageChange} accept="image/png, image/jpg" />        
        <button type='submit'>New profile picture</button>
      </form>
      <Link href="/">
        <button>Homepage</button>
      </Link>
    </div>
  );
}
