import { createClient } from '@/utils/supabase/server';
import { Button } from "@/components/ui/button";
import CheckoutCouponTotal from "@/components/checkout_coupon_total";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PricingCards from "@/components/pricing-cards";
import { checkoutAction } from '@/app/actions';

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

    const formattedDate = formatDate(searchParams?.event_date as string); // Cast to string to avoid type errors

    return (
      <form action={checkoutAction} method="POST">
      <Link href="/dashboard/events/create">
        <Button size="sm">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </Link>
      <div className="flex flex-col lg:flex-row">
      <div className="mt-12 w-full">
          <h2 className="font-bold text-2xl mb-4">Confirm your event order</h2>
            <div className="flex flex-col gap-2 w-full lg:w-3/4 [&>input]:mb-3 mt-8">
            <Label htmlFor="event_name">Event name</Label>
            <Input name="event_name" value={searchParams?.event_name} readOnly />
            <Label htmlFor="event_type">Event type</Label>
            <Input name="event_type" value={searchParams?.event_type} readOnly />
            <Label htmlFor="event_date_formatted">Event date</Label>
            <Input name="event_date_formatted" value={formattedDate} readOnly />
            <Label htmlFor="event_package">Event package</Label>
            <Input name="event_package" value={searchParams?.event_package} readOnly />
            <input type="hidden" name="event_date" value={searchParams?.event_date} />
            {/* <SubmitButton formAction={signUpAction} pendingText="Signing up...">
                Sign up
            </SubmitButton>
            <FormMessage message={searchParams} /> */}
            </div>
        </div>

        <div className="my-6 lg:my-12 flex flex-col w-full lg:w-3/4 items-start">
          <h2 className="font-bold text-xl">Coupon Code</h2>
        {/* Responsive pricing cards */}
        <div className="flex flex-col gap-2 w-full mt-4">
          <CheckoutCouponTotal package_name={searchParams?.event_package} />
          <div className="flex flex-col w-full mt-14 items-center lg:items-end">
              <Button type="submit">
                  Proceed to payment
              </Button>

          </div>
        </div>
        </div>

      </div>
      </form>
    );
  }