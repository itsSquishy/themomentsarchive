"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeaderAuth from "@/components/header-auth"; // Pass this from Navbar
import { X, AlignRight } from "lucide-react";
import { usePathname } from 'next/navigation'; // Import usePathname

export default function MobileMenu({ headerAuth }: { headerAuth: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Toggle scroll lock when mobile menu is open/closed
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup when the component is unmounted or menu is closed
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button onClick={toggleMobileMenu} className="sm:hidden">
        {isMobileMenuOpen ? <X /> : <AlignRight />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute h-screen top-24 left-0 right-0 bg-background border-b border-primary p-6 shadow-xl z-40 sm:hidden rounded-lg">
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/about" // Change this to your actual path
                className={`hover:text-primary font-semibold text-sm ${pathname === '/about' ? 'text-primary' : 'text-black'}`}
                onClick={handleLinkClick} // Close menu on click
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={`hover:text-primary font-semibold text-sm ${pathname === '/pricing' ? 'text-primary' : 'text-black'}`}
                onClick={handleLinkClick} // Close menu on click
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/demo"
                className={`hover:text-primary font-semibold text-sm ${pathname === '/demo' ? 'text-primary' : 'text-black'}`}
                onClick={handleLinkClick} // Close menu on click
              >
                Demo
              </Link>
            </li>
          </ul>
          {/* Pass in HeaderAuth from the server component */}
          <div className="mt-6">{headerAuth}</div>
        </div>
      )}
    </>
  );
}
