import { useState } from 'react';
import { setProfilePictureRequest } from '../api/user';
import PhotoBox from './photo';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfileForm(): JSX.Element {
  const {data: session} = useSession();
  const [imageUrl, setImageUrl] = useState<string>('');

  const id: string = session?.user.id ?? '';
  const accessToken: string = session?.user.access_token ?? '';

  const handleNewProfilePicture = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await setProfilePictureRequest(
        id,
        accessToken,
        // 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg'
        imageUrl
      );
      setImageUrl(response.profile_picture);
      console.log(imageUrl)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>{session?.user.username}</h2>
      <h2>{session?.user.name}</h2>
      <form onSubmit={handleNewProfilePicture}>
        <PhotoBox imageUrl={imageUrl} width={300} height={300} />
        <button type='submit'>New profile picture</button>
      </form>
      <Link href="/">
        <button>Homepage</button>
      </Link>
    </div>
  );
}
