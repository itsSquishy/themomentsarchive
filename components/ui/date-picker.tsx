"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  minDate?: Date; // Optional prop for minimum date
  name: string;    // Name prop for form submission
  date: Date | null; // Added date prop to manage selected date
  setDate: React.Dispatch<React.SetStateAction<Date | null>>; // Function to set date
}

export function DatePicker({ minDate, name, date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined} // Pass undefined if date is null
          onSelect={(selectedDate) => {
            if (selectedDate instanceof Date) {
              setDate(selectedDate); // Update the date in the parent component
            }
          }}
          disabled={(day) => {
            const currentDate = new Date();
            return day < (minDate || currentDate) || day < new Date("1900-01-01");
          }}
          initialFocus
          fromMonth={minDate} // Start the calendar from the minDate
        />
      </PopoverContent>
      <input type="hidden" name={name} value={date ? format(date, "dd-MM-yyyy") : ""} />
    </Popover>
  );
}
