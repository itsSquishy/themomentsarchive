import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthFooterButtons() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return user ? (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-2 bg-transparent">
      {/* <span>Hey, {user.email}!</span>
      <form action={signOutAction} className="flex-1">
        <Button type="submit" size="sm" variant={"outline"} className="w-full">
          Sign out
        </Button>
      </form> */}
      <Button asChild size="default" variant={"default"}>
        <Link href="/dashboard/home">Dashboard</Link>
      </Button>
    </div>
  ) : (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex gap-2 bg-background">
      <Button className="flex-1" asChild size="default" variant={"outline"}>
        <a href="/sign-in">Sign in</a>
      </Button>
      <Button className="flex-1" asChild size="default" variant={"default"}>
        <a href="/dashboard/home">Get started</a>
      </Button>
    </div>
  );
}
