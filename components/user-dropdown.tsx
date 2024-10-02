"use client"; // Ensure it's a client component

import { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { User } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { toast } from "sonner";

export default function UserDropdown() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Failed to fetch user info");

        const userData = await response.json();
        setUserEmail(userData.email);
        setUserName(userData.user_metadata.first_name);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    // Manually trigger sign-out action
    await signOutAction();
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User className="transition-transform text-primary" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="">Signed in as</p>
            <p className="font-semibold text-primary">{loading ? "Loading..." : userName}</p>
            {/* <p className="font-semibold">{loading ? "Loading..." : userEmail}</p> */}
          </DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
          <DropdownItem key="toast" color="success" 
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
            })
          }>
            Toasties
          </DropdownItem>
          {/* Use an onClick event to trigger the sign out action */}
          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
