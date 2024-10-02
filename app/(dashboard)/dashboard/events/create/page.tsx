import { createClient } from '@/utils/supabase/server';
import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PricingCards from "@/components/pricing-cards";
import PricingRadioButtons from "@/components/pricing-radio-buttons";
import { createEventAction } from "@/app/actions";
import { ChevronLeft } from "lucide-react";

export default async function CreateEventPage({ searchParams }: { searchParams: Message }) {
    return (
      <>
      <Link href="/dashboard/events">
        <Button size="sm">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </Link>
        <div className="my-12">
          <h2 className="font-bold text-2xl mb-4">Create a new event</h2>
          <FormMessage message={searchParams} />
        {/* Responsive pricing cards */}
          <form>
            <div className="flex flex-col gap-2 w-full my-8">
                <PricingRadioButtons />
                <div className="flex flex-col gap-2 w-full lg:w-3/4 xl:w-3/4 md:w-3/4 [&>input]:mb-3 mt-3">
                <Label htmlFor="event_name">Event name</Label>
                <Input name="event_name" placeholder="Your event name" required />
                <Label htmlFor="event_type">Event type</Label>
                <Select name="event_type" required >
                  <SelectTrigger className="w-full data-[placeholder]:text-gray-500">
                    <SelectValue placeholder="Select an event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wedding">Wedding</SelectItem>
                    <SelectItem value="Corporate event">Corporate event</SelectItem>
                    <SelectItem value="Baby shower">Baby shower</SelectItem>
                    <SelectItem value="Party">Party</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                </div>
            </div>
            <div className="flex flex-col items-center">
              <Button formAction={createEventAction} type="submit">
                Proceed to checkout
              </Button>
            </div>
          </form>
        </div>


      </>
    );
  }