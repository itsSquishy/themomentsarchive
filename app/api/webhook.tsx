// pages/api/webhook.ts

import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("outside webhook");
  if (req.method === "POST") {
    const { status, reference_number, name, email, purpose, amount, currency } = req.body;
    
    console.log("request method POST");
    // Check if the payment was successful
    if (status === "completed") {
        console.log("status completed");
      // Extract event details from the purpose field
      const [eventName, eventDate, eventPackage] = purpose.split(" | ");

      // Insert a new record into the events table
      const { error } = await supabase
        .from("events")
        .insert({
          event_name: eventName,
          event_date: eventDate,
          event_package: eventPackage,
          total_amount: amount,
          currency,
          user_email: email,
          user_name: name,
          reference_number,
        });

      if (error) {
        console.error("Error inserting event:", error);
        return res.status(500).json({ error: "Failed to insert event into the database" });
      }

      // Respond with success
      return res.status(200).json({ message: "Payment and event recorded successfully" });
    }

    // Handle other statuses (e.g., failed, pending)
    return res.status(400).json({ error: "Payment was not successful" });
  }

  // Only allow POST requests
  res.setHeader("Allow", "POST");
  res.status(405).end("Method Not Allowed");
}
