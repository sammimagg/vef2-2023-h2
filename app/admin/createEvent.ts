export const newEventRequest = async (
    id: number, 
    name: string, 
    slug: string, 
    location: string,
    url: string,
    description: string,
    created: string,
    updated: string
    ): Promise<Response | Error> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newEvent`, {
            method:'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id,
                name,
                slug,
                location,
                url,
                description,
                created,
                updated,
            }),
        });
        if(response.ok){
            return response
        } else {
            const errorMessage = `Request failed with status ${response.status}`;
            return new Error(errorMessage);
        }
    } catch (error){
        if(error instanceof Error){
            return error;
        }
        return new Error('Unknown error occured when creating event');
    }
};

