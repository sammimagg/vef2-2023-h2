import { useState } from 'react';
import { setProfilePictureRequest } from '../api/user';
import PhotoBox from './photo';
import { useSession } from 'next-auth/react';

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
        'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg'
      );
      setImageUrl(response.profile_picture);
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
    </div>
  );
}
