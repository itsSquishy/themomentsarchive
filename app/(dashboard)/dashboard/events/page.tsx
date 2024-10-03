import { createClient } from "@/utils/supabase/server";
import { EventsTable, EmptyEventsTable} from "@/components/events";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from 'next/link';
import ToastHandler from "@/components/toast-handler";

export default async function EventsPage({ searchParams }: { searchParams: { status?: string; event_name?: string; event_date?: string } }) {
  // Fetch data from Supabase
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  const { data: events, error: eventsError } = await supabase
  .from("events")
  .select() // Select the fields you need
  .eq("user_id", user?.id); // Filter by user ID

  // Check for user fetching errors
  if (userError) {
    console.error("Error fetching user:", userError);
    return <div>Error fetching user</div>;
  }

  // Check for event fetching errors
  if (eventsError) {
    console.error("Error fetching events:", eventsError);
    return <div>Error fetching events</div>;
  }

  // Log the status if it exists in searchParams
  if (searchParams.status) {
    console.log("Payment Status:", searchParams.status);
  }

  // Render based on whether events exist
  return (
    <div>
      <ToastHandler 
      status={searchParams.status}
      event_name={searchParams.event_name}
      event_date={searchParams.event_date} /> {/* Include the ToastHandler here */}
      
      <div className="mb-4">
        <h2 className="font-bold text-2xl mb-6">Events</h2>
        <Link href="/dashboard/events/create">
          <Button size="sm">
            <Pencil className="h-4 w-4 mr-2" />
            Create new event
          </Button>
        </Link>
      </div>
      <div className="w-full md:w-3/4 xl:w-full mt-8">
      {events && events.length > 0 ? (
        <EventsTable events={events} />
      ) : (
        <EmptyEventsTable />
      )}
      </div>
    </div>
    
  );
}


