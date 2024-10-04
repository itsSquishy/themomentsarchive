// NavLinks.tsx
"use client"; // This must be a client component

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <ul className="hidden sm:flex gap-4">
      <li>
        <Link
          href="/about"
          className={`hover:text-primary font-semibold text-sm ${pathname === '/about' ? 'text-primary' : 'text-black'}`}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/pricing"
          className={`hover:text-primary font-semibold text-sm ${pathname === '/pricing' ? 'text-primary' : 'text-black'}`}
        >
          Pricing
        </Link>
      </li>
      <li>
        <Link
          href="/demo"
          className={`hover:text-primary font-semibold text-sm ${pathname === '/demo' ? 'text-primary' : 'text-black'}`}
        >
          Demo
        </Link>
      </li>
    </ul>
  );
}
