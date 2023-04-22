import { getToken } from "next-auth/jwt";
import { User, UserInfo, UserList } from "../types";

/**
 * @api {patch} /admin/:slug Update Event
 * @apiName UpdateEvent
 * @apiGroup Admin
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 400 Bad Request
 * @apiError {String} status 500 Internal Error
 * @apiDescription Update an event. The user needs to have a Bearer Token in Authorization and be an admin.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission Admin
 * @apiExample {json} Request Body Example:
 * {
 *   "name": "prufa",
 *   "description": "Prufa",
 *   "location": "prufa",
 *   "url": "prufa"
 * }
 */
export const updateEventAPI = async(
    accessToken:string,
    slug:string,
    name: string,
    description: string,
    location: string,
    url: string
): Promise<Response | Error> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            name,
            description,
            location,
            url,
          }),
        });
        if(response.ok) {
            return response.json()
        }
    }
     catch (error) {
    if (error instanceof Error) {
      return error;
    }    
  }
  return new Error("Unknown error occurred during user retrieval");
}
/**
 * @api {post} /admin/:slug/register Get Registered Users
 * @apiName GetRegisteredUsers
 * @apiGroup Admin
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiDescription Get all users registered for a specific event by slug.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission Admin
 * @apiExample {json} Response Example:
 * [
 *   {
 *     "id": 2,
 *     "name": "User",
 *     "username": "user",
 *     "password": "Hashed password",
 *     "admin": true,
 *     "profile_picture": null
 *   },
 *   ...
 * ]
 */
export const getRegisteredUserAPI = async (
    accessToken: string,
    slug: string
  ): Promise<UserList[] | Error> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${slug}/register`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
  
      if (response.ok) {
        const users = data.registrations.map(
          (registration: any) =>
            ({
              id: registration.id,
              name: registration.name,
              username: registration.username,
              admin: registration.admin,
              profile_picture:"",
            } as UserList)
        );
  
        return users;
      } else {
        const errorMessage = "Failed to get registered users";
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
  
      return new Error("Unknown error occurred during user retrieval");
    }
  };
  
/**
 * @api {delete} /admin/delete/:slug Delete Event
 * @apiName DeleteEvent
 * @apiGroup Admin
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 400 Bad Request
 * @apiDescription Delete an event by slug. The user needs to have a Bearer Token in Authorization and be an admin.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission Admin
 */
export const deleteEventAPI = async(
    accessToken:string,
    slug:string
): Promise<boolean | Error> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/delete/${slug}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        if(response.ok) {
            return true
        }
        else {
            return false
        }
    }
    catch(error) {
        if (error instanceof Error) {
            return error;
          }
      
          return new Error("Unknown error occurred during user retrieval");

    }
}
/**
 * @api {post} /admin/:slug Create Event
 * @apiName CreateEvent
 * @apiGroup Admin
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 400 Bad Request
 * @apiError {String} status 500 Internal Error
 * @apiDescription Create a new event. The user needs to have a Bearer Token in Authorization and be an admin.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission Admin
 * @apiExample {json} Request Body Example:
 * {
 *   "name": "prufa",
 *   "description": "Prufa",
 *   "location": "prufa",
 *   "url": "prufa"
 * }
 */
export async function createEvent(
    accessToken:string,
    name: string, 
    description: string,
    location: string,
    url: string,
    slug: string
    ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${slug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            name,
            description,
            location,
            url
        })
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to create event');
    }
  }
  
