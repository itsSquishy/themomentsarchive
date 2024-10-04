'use client'; // This is a client-side component

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Define the type for a single event
interface Event {
  id: number;
  event_name: string;
  event_type: string;
  event_date: string | Date; // Ensure event_date can be a string or Date
}

// Define your columns
const columns = [
  { key: "event_name", label: "EVENT NAME" },
  { key: "event_type", label: "TYPE" },
  { key: "event_date", label: "DATE" },
];

// Function to get the key-value dynamically
function getKeyValue(item: Event, key: keyof Event) {
  return item[key];
}

// Function to format the date
function formatDate(date: string | Date): string {
  const eventDate = new Date(date); // Ensure it works with both string and Date types
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(eventDate);
}

// Client-side Table Component
interface EventsProps {
  events: Event[]; // Expect events to be an array of Event objects
}

export function EventsTable({ events }: EventsProps) {
  return (
    // <Table aria-label="Events">
    //   <TableHeader columns={columns}>
    //     {(column) => <TableColumn className="bg-primary text-white" key={column.key}>{column.label}</TableColumn>}
    //   </TableHeader>
    //   <TableBody items={events}>
    //     {(item: Event) => (
    //       <TableRow key={item.id}>
    //         {(columnKey) => (
    //           <TableCell>
    //             {/* Always convert the content to a string */}
    //             {columnKey === "event_date"
    //               ? formatDate(item.event_date)
    //               : String(getKeyValue(item, columnKey as keyof Event))}
    //           </TableCell>
    //         )}
    //       </TableRow>
    //     )}
    //   </TableBody>
    // </Table>
    
    <div className="w-full flex flex-col gap-4"> {/* Tailwind CSS for layout */}
      {events.map((event) => (
        <Card key={event.id} className="min-w-sm bg-primary border border-customTealBorder shadow-lg"> {/* Using Tailwind CSS for min-width */}

            <CardContent className="p-3">
            <p className="uppercase font-semibold text-white">{formatDate(event.event_date)}</p>
            <p className="text-tiny uppercase text-background/40">{event.event_type}</p>
              <CardHeader className="p-0 pt-3">
              <p className="text-base md:text-xl text-white font-bold">{event.event_name}</p>
              </CardHeader>
            </CardContent>

        </Card>
      ))}
    </div>
  );
}

export function EmptyEventsTable() {
  return (
    // <Table aria-label="No events">
    //   <TableHeader columns={columns}>
    //     {(column) => <TableColumn className="bg-primary text-white" key={column.key}>{column.label}</TableColumn>}
    //   </TableHeader>
    //   <TableBody emptyContent={"You have not created an event yet."}>{[]}</TableBody>
    // </Table>
    <div className="w-full flex flex-col gap-4">
      <p>You have not created any events yet.</p>
    </div>
  );
}
