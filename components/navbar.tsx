import Link from 'next/link';
import Image from 'next/image';
import HeaderAuth from "@/components/header-auth";
import { Button } from "./ui/button";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import AuthFooterButtons from "@/components/footer-auth";

export default function Navbar() {
  return (
    <NextUINavbar isBordered maxWidth="xl" position="sticky" className="h-24 bg-background/50 z-50 rounded-lg">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Chaz Inventory Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-20 h-auto sm:w-24"
            />
          </Link>
        </NavbarBrand>
        <ul className="hidden sm:flex gap-2 justify-start ml-2">
            <NavbarItem>
              <Link href="/pricing" className="hover:text-primary font-semibold p-3 text-sm">
                About
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/pricing" className="hover:text-primary font-semibold p-3 text-sm">
                Pricing
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/demo" className="hover:text-primary font-semibold p-3 text-sm">
                Demo
              </Link>
            </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle className="text-primary" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mt-12 flex flex-col gap-2">
          <NavbarMenuItem>
            <a href="/pricing" className="text-primary text-base font-semibold p-2">
              About
            </a>
          </NavbarMenuItem>
          <div className="border-b border-gray-300 my-0" /> {/* Thin divider */}
          <NavbarMenuItem>
            <a href="/pricing" className="text-primary text-base font-semibold p-2">
              Pricing
            </a>
          </NavbarMenuItem>
          <div className="border-b border-gray-300 my-0" /> {/* Thin divider */}
          <NavbarMenuItem>
            <a href="/demo" className="text-primary text-base font-semibold p-2">
              Demo
            </a>
          </NavbarMenuItem>
          <div className="border-b border-gray-300 my-0" /> {/* Thin divider */}
          
          
          <div className='fixed bottom-0 left-0 right-0 p-4 flex gap-2'>
          <AuthFooterButtons />
          </div>
        </div>
      </NavbarMenu>


      <div className="hidden sm:flex gap-4 items-center">
        <HeaderAuth />
      </div>
    </NextUINavbar>
  );
}
