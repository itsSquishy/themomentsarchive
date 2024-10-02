'use client'; // Client component for handling button actions

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  text?: string; // Optional prop for custom button text
}

export default function BackButton({ text = "Back" }: BackButtonProps) { // Default text
  const goBack = () => {
    if (typeof window !== "undefined") {
      history.back(); // Use the browser's back action
    }
  };

  return (
    <Button size="sm" onClick={goBack}>
      <ChevronLeft className="h-4 w-4 mr-2" />
      {text}
    </Button>
  );
}
