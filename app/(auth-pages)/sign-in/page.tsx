import Image from "next/image";
import Link from "next/link";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/password-input";
import Quotes from "@/components/quotes";

export default function SignInPage({ searchParams }: { searchParams: Message }) {
  return (
    <>
    {/* Logo for devices smaller than 1024px */}
    <div className="absolute top-4 left-4 lg:hidden">
      <a href="/">
        <Image
          src="/logo.png" // Path to your logo
          alt="The Moments Archive Logo"
          width={70} // Set the desired width
          height={70} // Set the desired height
          className="mr-2"
        />
      </a>
    </div>
      <div className="container relative min-h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-primary" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <a href="/">
            <Image
                src="/logo_inversed.png" // Path to your logo
                alt="The Moments Archive Logo"
                width={100} // Set the desired width
                height={100} // Set the desired height
                className="mr-2" // Add margin if needed
                />
            </a>
          </div>
          <div className="relative z-20 mt-auto min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[1000px] max-w-full">
            <Quotes/>
          </div>
        </div>
        <div className="lg:p-8 flex flex-col justify-center w-full h-full px-4 md:px-0">
          <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account
              </p>
            </div>
            <form>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                    className="text-xs text-primary underline"
                    href="/forgot-password"
                >
                    Forgot Password?
                </Link>
                </div>
                <PasswordInput
                  name="password"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
                <SubmitButton pendingText="Signing in..." formAction={signInAction}>
                Sign in
                </SubmitButton>
                <FormMessage message={searchParams} />
            </div>
            </form>
            <p className="text-sm text-foreground text-center">
                Don't have an account?{" "}
                <Link className="text-primary font-medium underline" href="/sign-up">
                Sign up
                </Link>
            </p>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
