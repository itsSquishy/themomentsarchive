// src/app/notes/page.js (or wherever your page component is)
import { createClient } from "@/utils/supabase/server";
import { EventsTable, EmptyEventsTable} from "@/components/events";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from 'next/link';

export default async function NotesPage() {
  // Fetch data from Supabase
  const supabase = createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  const { data: events, error: eventsError } = await supabase
  .from("events")
  .select() // Select the fields you need
  .eq("user_id", user?.id); // Filter by user ID

  return events ? (
    <div>
      <div className="mb-4">
        <h2 className="font-bold text-2xl mb-14">Orders</h2>
      </div>
      <EventsTable events={events} />
    </div>
  ) : (
    <div>
      <div className="mb-14">
        <h2 className="font-bold text-2xl mb-14">Events</h2>
        <Button>
          <Pencil className="h-4 w-4 mr-3" />
          Create new event
        </Button>
      </div>
      <EmptyEventsTable />
    </div>
  );
  
  
  // if (!events || events.length === 0) {
  //   return (
  //     <div>
  //       <div className="mb-14">
  //         <h2 className="font-bold text-2xl mb-14">Events</h2>
  //         <Button>
  //           <Pencil className="h-4 w-4 mr-3" />
  //           Create new event
  //         </Button>
  //       </div>
  //       <EmptyEventsTable />
  //     </div>
  //   );
  // }

  // Pass the fetched notes as props to the client component
  // return (
  //   <div>
  //     <div className="mb-4">
  //       <h2 className="font-bold text-2xl mb-14">Events</h2>
  //         <Button>
  //           <Pencil className="h-4 w-4 mr-3" />
  //           Create new event
  //         </Button>
  //     </div>
  //     <EventsTable events={events} />
  //   </div>
  // );

}


