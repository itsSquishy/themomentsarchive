'use client'; // Ensure it's a client component

import { useEffect, useState } from 'react';
import { Menu, User, X, Home, Calendar, AlignLeft, ReceiptText } from 'lucide-react'; // Import icons from Lucide
import Link from 'next/link';
import UserDropdown from "@/components/user-dropdown";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (link: string) => {
    setIsOpen(false); // Close the drawer when a link is clicked
  };

  return (
    <div className="relative z-50 mb-16">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full h-12 bg-background text-white p-4 flex justify-between items-center z-50 border-b border-gray-300 shadow-md">
        {/* Hamburger menu button for mobile */}
        <button
          className="text-primary lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AlignLeft />
        </button>

        {/* Title or logo */}
        <div className="flex items-center space-x-2">
          <a href="/">
            <img src="/logo.png" alt="The Moments Archive Logo" className="h-14" />
          </a>
        </div>

        <UserDropdown />
      </header>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen border-r border-customTealBorder bg-primary text-white w-64 hidden lg:block shadow-lg`}>
        <nav className="mt-12 p-4">
          <ul className="space-y-4 mt-6">
            <li>
              <Link href="/dashboard/home" className={`flex items-center space-x-3 text-md p-2 pl-4 rounded-md ${pathname === '/dashboard/home' ? 'text-primary bg-background' : 'text-white hover:text-background'}`} onClick={() => handleLinkClick('/dashboard/home')}>
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/events" className={`flex items-center space-x-3 text-md p-2 pl-4 rounded-md ${pathname.startsWith('/dashboard/events') ? 'text-primary bg-background' : 'text-white hover:text-background'}`} onClick={() => handleLinkClick('/dashboard/events')}>
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/orders" className={`flex items-center space-x-3 text-md p-2 pl-4 rounded-md ${pathname === '/dashboard/orders' ? 'text-primary bg-background' : 'text-white hover:text-background'}`} onClick={() => handleLinkClick('/dashboard/orders')}>
                <ReceiptText className="h-4 w-4" />
                <span>Orders</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Drawer for mobile menu */}
      <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="top-0 ml-0 w-64 rounded-r-lg">
          <nav className="mt-12 p-4">
            <ul className="space-y-4">
              <li>
                <Link href="/dashboard/home" className={`flex items-center space-x-3 text-md p-2 pl-4 rounded-md ${pathname === '/dashboard/home' ? 'text-primary bg-background' : 'text-white hover:text-background'}`} onClick={() => handleLinkClick('/dashboard/home')}>
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/events"
                  className={`flex items-center space-x-3 text-md p-2 pl-4 rounded-md ${
                    pathname.startsWith('/dashboard/events') 
                      ? 'text-primary bg-background' 
                      : 'text-white hover:text-background'
                  }`}
                  onClick={() => handleLinkClick('/dashboard/events')}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Events</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className={`flex items-center space-x-3 text-md p-2 pl-4 rounded-md ${pathname === '/dashboard/orders' ? 'text-primary bg-background' : 'text-white hover:text-background'}`} onClick={() => handleLinkClick('/dashboard/orders')}>
                  <ReceiptText className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
              </li>
            </ul>
          </nav>
          {/* Close button */}
          {/* <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-primary">
            <X className="h-6 w-6" />
          </button> */}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
