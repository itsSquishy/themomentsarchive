import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";
import WordRotator from "@/components/word-rotator";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="relative flex flex-col gap-16 mt-12 items-center">

      {/* Hero Content */}
      <div className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center font-bold p-4 z-10">
        Photo & video sharing for your{" "}
        <br />
        <WordRotator />{" "}
        <br />
        <p className="text-gray-700 text-base font-semibold">
          Now made easy with a scannable QR code
        </p>
        {/* Button container */}
        <div className="flex mt-16 gap-2 justify-center">
          <Button asChild size="default" variant={"default"}>
            <Link href="/dashboard/home">Get started</Link>
          </Button>
          <Button asChild size="default" variant={"outline"}>
            <Link href="/protected">Try the Demo</Link>
          </Button>
        </div>
      </div>

      {/* Gradient Divider */}
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8 z-10" />
    </div>
  );
}
