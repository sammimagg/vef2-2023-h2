import { getEventBySlug} from '../../api/event';
import { Event } from "../../types";
import 'bootstrap/dist/css/bootstrap.css'

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import UpdateForm from './UpdateForm';
import DeleteButton from './DeleteEvent';
import Nav from '../../nav';



  
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
           {/* @ts-expect-error Server Component */}
          <Nav/>
          <DeleteButton slug={slug}/>
          <UpdateForm slug={slug} />
        </main>
      );
    }
  }
  