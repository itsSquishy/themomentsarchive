import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react"; // Import NextUIProvider
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/navbar";

const defaultUrl = process.env.NETLIFY_URL
  ? `https://${process.env.NETLIFY_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "The Moments Archive | Event Photo and Video Sharing with QR Code",
  description: "Event Photo and Video Sharing with QR Code",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <NextUIProvider> {/* Wrap with NextUIProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen flex flex-col items-center">
              <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <div className="flex flex-col items-center gap-10 w-full">
                  {children}
                </div>
              </div>
            </main>
          </ThemeProvider>
        </NextUIProvider> {/* End of NextUIProvider */}
      </body>
    </html>
  );
}
