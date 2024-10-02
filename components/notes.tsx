'use client'; // This is a client-side component

import { Table, TableHeader, TableBody, TableRow, TableCell, TableColumn } from "@nextui-org/react";

// Define the type for a single note
interface Note {
  id: number;
  event_name: string;
  event_type: string;
}

// Define your columns
const columns = [
  { key: "event_name", label: "EVENT NAME" },
  { key: "type", label: "TYPE" }, // Include other fields as needed
  { key: "date", label: "DATE" }, // Include other fields as needed
];

// Function to get the key-value dynamically
function getKeyValue(item: Note, key: keyof Note) {
  return item[key];
}

// Client-side Table Component
interface NotesTableProps {
  notes: Note[]; // Expect notes to be an array of Note objects
}

export function NotesTable({ notes }: NotesTableProps) {

  return (
    <Table aria-label="Events">
      <TableHeader columns={columns}>
        {(column) => <TableColumn className="bg-primary text-white" key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={notes}>
        {(item: Note) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {/* Cast columnKey to keyof Note */}
                <a href="#">{getKeyValue(item, columnKey as keyof Note)}</a>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export function EmptyNotesTable() {
  return (
    <Table aria-label="No events">
      <TableHeader columns={columns}>
        {(column) => <TableColumn className="bg-primary text-white" key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No events available."}>{[]}</TableBody>
    </Table>
  );
}
