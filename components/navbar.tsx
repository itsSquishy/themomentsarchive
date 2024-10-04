// Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import HeaderAuth from "@/components/header-auth";
import MobileMenu from "@/components/mobile-menu"; // Import the client component
import NavLinks from "@/components/nav-links";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-24 bg-background backdrop-blur-lg shadow-lg flex items-center justify-between px-6 lg:px-12 max-w-7xl w-full mx-auto rounded-lg">
      {/* Left side: Brand and Links */}
      <div className="flex items-center gap-6">
        {/* Brand Logo */}
        <Link href="/">
          <Image
              src="/logo.png"
              alt="Chaz Inventory Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-20 h-auto"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <NavLinks /> {/* Use the NavLinks client component */}
      </div>

      {/* Right side: Authentication */}
      <div className="hidden sm:flex items-center gap-4">
        <HeaderAuth /> {/* Server Component */}
      </div>

      {/* Mobile Menu (Client-Side Toggle) */}
      <MobileMenu headerAuth={<HeaderAuth />} /> {/* Pass HeaderAuth to MobileMenu */}
    </nav>
  );
}
