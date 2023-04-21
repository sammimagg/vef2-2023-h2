import { error } from "console";
import { SetProfilePictureResponse } from "../types";

/**
 * @api {post} /signup Signup
 * @apiName Signup
 * @apiGroup User
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 400 Bad Request
 * @apiDescription Register a new user. By default, the user has no admin privileges.
 * @apiExample {json} Request Body Example:
 * {
 *   "name": "Samúel Magnússon",
 *   "username": "sammi",
 *   "password": "12345678910"
 * }
 */
export const signUpRequest = async (
    name: string,
    username: string,
    password: string,
    email: string
  ): Promise<Response | Error> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          password
        }),
      });
  
      if (response.ok) {
        return response;
      } else {
        const errorMessage = `Request failed with status ${response.status}`;
        return new Error(errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
      return new Error('Unknown error occurred during sign-up');
    }
  };
  
/**
 * @api {get} /logout Logout
 * @apiName Logout
 * @apiGroup User
 * @apiSuccess {String} status 200 OK
 * @apiDescription Logs out the user and removes the session. The old access token will expire in 1 hour.
 */
export const logoutRequest = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (!response.ok){
        throw new Error('Logout request failed');
      }
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
    }
};

/**
 * @api {put} /users/:id/profile-picture Upload Profile Picture
 * @apiName UploadProfilePicture
 * @apiGroup User
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 401 Unauthorized
 * @apiError {String} status 500 Internal Error
 * @apiDescription Upload a profile picture for a user. The user needs to be logged in. Only JPG and PNG allowed with a maximum file size of 50 * 2024 * 1024 bytes.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission User, Admin
 * @apiExample {form-data} Request Body Example:
 * form-data: KEY=images,VALUE=local path to picture.
 * @apiExample {json} Response Example:
 * {
 *   "id": 15,
 *   "name": "user",
 *   "username": "user",
 *   "password": "Hashed password",
 *   "admin": false,
 *   "profile_picture": "http://res.cloudinary.com/dxjolxcx7/image/upload/v1679249054/images/slod.png"
 * }
 */
// TODO

export const setProfilePictureRequest = async (
  id: string,
  accessToken: string,
  imagePath: string
): Promise<SetProfilePictureResponse> => {
  try {
    const formData = new FormData();
    formData.append('images', imagePath);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}/profile-picture`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData
    });

    if (response.ok) {
      const result: SetProfilePictureResponse = await response.json();
      return result;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getListOfRegisterEventFromId = async (
  id: string
): Promise<Response | Error> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}/registered`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response
    }catch(error) {
      console.error(error)
      return new Error()
    }
}
