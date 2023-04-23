import { Event, EventInfo, Registration } from "../types";
/**
 * @api {get} /events List Events
 * @apiName ListEvents
 * @apiGroup Event
 * @apiSuccess {String} status 200 OK
 * @apiDescription Returns a list of all events.
 */
export const getEventsList = async (): Promise<Event[] | Error> => {

    try {
      const responseFromServer = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (responseFromServer.ok) {
        const responseData = await responseFromServer.json();
        const events: Event[] = responseData.map((event: any) => ({
          id: event.id,
          name: event.name,
          slug: event.slug,
          location: event.location,
          url: event.url,
          description: event.description,
          created: new Date(event.created),
          updated: new Date(event.updated),
        }));
        return events;
      } else {
        const errorMessage = `Request failed with status ${responseFromServer.status}`;
        return new Error(errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
      return new Error('Unknown error occurred during fetch');
    }
  };



/**
 * @api {get} /events/:slug Get Event
 * @apiName GetEvent
 * @apiGroup Event
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 409 Conflict
 * @apiDescription Get a specific event by slug or POST to register for an event. You will get a conflict if you are already registered for that event.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission User, Admin
 */
export const getEventBySlug = async (slug: string): Promise<EventInfo> => {
    const nullEvent: EventInfo ={id: 0,name:"",location:"",description:"",url:""}
    try {
      const responseFromServer = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${slug}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (responseFromServer.ok) {
        const eventData = await responseFromServer.json();
        const event: Event = {
          id: eventData.id,
          name: eventData.name,
          slug: eventData.slug,
          location: eventData.location,
          url: eventData.url,
          description: eventData.description,
          created: eventData.created,
          updated: eventData.updated,
        };
        return event;
      } else {
        const errorMessage = `Request failed with status ${responseFromServer.status}`;
        console.error(errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
      console.error(error);
    }
    return nullEvent;
  };
  
/**
 * @api {post} /events/:slug Register for Event
 * @apiName RegisterForEvent
 * @apiGroup Event
 * @apiSuccess {String} status 200 OK
 * @apiError {String} status 404 Not Found
 * @apiError {String} status 409 Conflict
 * @apiDescription Register for a specific event by slug. You will get a conflict if you are already registered for that event.
 * @apiHeader {String} Authorization Bearer Token
 * @apiPermission User, Admin
 */
export const registerForEvent = async (
  accessToken: string,
  slug: string,
  username: string,
  comment: string
): Promise<Response | Error> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${slug}`, {
      cache: 'no-store',
      method:'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        username, 
        comment
      }),
    });
    const data = await response.json();
    if (response.ok){
      return response;
    } else {
      const errorMessage = `Already Register`;
      return new Error(errorMessage);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
    return new Error('Unknown error occured during register');
  }
}
export const getUserRegisterToEventBySlug = async (slug: string): Promise<Registration[] | Error> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${slug}/register`, {
      method:'GET',
      headers: {
        'Content-type': 'application/json',
      },cache: 'no-store'
    });

    if (response.ok){

      const data = await response.json();
      
      const usersRegistered: Registration[] = data.map((registration: any) => ({
        id: registration.id,
        name: registration.name,
        username: registration.username,
        profile_picture: registration.profile_picture,
        comment: registration.comment
      }));
      
      return usersRegistered;
    } else {
      const errorMessage = `Request failed with status ${response.status}`;
      return new Error(errorMessage);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
    return new Error('Unknown error occured during register');
  }
}
export const isUserRegisterToEvent = async (accessToken: string,slug: string, userId: string): Promise<boolean | Error> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${slug}`, {
      cache: 'no-store',
      method:'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });
    const data = await response.json();
    if (data){
      if(data[0].exists)
        return true
      else
        return false
    }
  }catch(error) {
    if(error instanceof Error) {
      return new Error('Error')
    }
  }
  return new Error('Error on api')
}
export const unregisterUserToEvent = async (accessToken: string,slug: string, userId: string): Promise<boolean | Error> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${slug}`, {
      method:'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        userId

      }),
    });
    const data =  await response.json();
    if (response.ok){

      return true;
    }
  }catch(error) {
    if(error instanceof Error) {
      return new Error('Error')
    }
  }
  return new Error('Error on api')
}