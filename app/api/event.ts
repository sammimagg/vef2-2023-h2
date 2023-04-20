import { Event } from "../types";
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
export const getEventBySlug = async (slug: string): Promise<Event | Error> => {
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
  event: string,
  username: string,
  comment: string
): Promise<Response | Error> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${getEventBySlug}`, {
      method:'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        event, 
        username, 
        comment
      }),
    });

    if (response.ok){
      return response;
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