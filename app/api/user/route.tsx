// src/app/api/user/route.ts
import { NextResponse } from 'next/server';
import { createClient } from "@/utils/supabase/server"; // Adjust the import path as needed

export async function GET() {
  try {
    const { data: { user }, error } = await createClient().auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return user data
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
