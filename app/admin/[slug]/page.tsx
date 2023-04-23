import { getEventBySlug} from '../../api/event';
import { Event } from "../../types";
import 'bootstrap/dist/css/bootstrap.css'

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import UpdateForm from './UpdateForm';


async function getEvent(slug: string): Promise<Event> {
    const res = getEventBySlug(slug);
    const data = await res;
    return data as Event;
  }
  
  export default async function EventPage({
    params,
  }: {
    params: { slug: string };
  }) {
    const { slug } = params;
    const session = await getServerSession(authOptions);
  
    if (session) {
      return (
        <main className="container">
          <UpdateForm slug={slug} />
        </main>
      );
    }
  }
  