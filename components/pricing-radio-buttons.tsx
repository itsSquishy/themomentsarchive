'use client';

import { useState } from "react";
import { CircleCheck } from "lucide-react"; // Import tick/check icon
import { DatePicker } from "./ui/date-picker";
import { Label } from "./ui/label";

// Define the pricing options with a list of features
const pricingOptions = [
  {
    id: 1,
    name: "Base",
    price: 49,
    description: "Digital Guestbook",
    features: [
      "Unlimited guests",
      "Unlimited photos and videos",
      "Customizable event page",
      "Digital QR Code + URL",
      "3 months access",
    ],
  },
  {
    id: 2,
    name: "Plus",
    price: 99,
    description: "Digital Guestbook + QR Cards",
    features: [
      "Unlimited guests",
      "Unlimited photos and videos",
      "Customizable event page",
      "Digital QR Code + URL",
      "6 months access",
      "50pcs printed mini QR cards",
    ],
  },
];

// Get the maximum number of features in any pricing option
const maxFeatures = Math.max(...pricingOptions.map(option => option.features.length));

export default function PricingRadioButtons() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [date, setDate] = useState<Date | null>(null); // State to manage date

  const handleChange = (id: number) => {
    setSelectedOption(id);
    setDate(null);
  };

  // Calculate the minimum date
  const calculateMinDate = () => {
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    if (selectedOption === 2) { // If "Plus" plan is selected
      minDate.setDate(currentDate.getDate() + 28); // Set to 4 weeks from today
    } else {
      minDate.setDate(currentDate.getDate()); // Allow today for other plans
    }
    return minDate;
  };

  return (
    <>
      <div className="w-full lg:w-3/4 xl:w-3/4 md:w-3/4 flex flex-col xl:flex-row xl:gap-2 gap-4">
        {pricingOptions.map((option) => (
          <label
            key={option.id}
            className={`border p-5 rounded-lg cursor-pointer w-full sm:w-3/4 md:w-full lg:w-11/12 xl:w-11/12 
              flex flex-col md:flex-row xl:flex-col justify-between 
              items-start md:items-center lg:items-center xl:items-start transition-all ${
              selectedOption === option.id
                ? "bg-primary/90 text-white scale-100 border border-customTealBorder"
                : "border-gray-300 bg-white scale-95"
            }`}
          >
            <input
              type="radio"
              name="event_package"
              value={option.name}
              checked={selectedOption === option.id}
              onChange={() => handleChange(option.id)}
              className="hidden"
            />

            {/* Left side with name, price, and description */}
            <div className="flex-grow flex flex-col items-start mb-4 lg:mb-0">
              <span className="text-lg font-bold">{option.name}</span>
              <span className="text-xl font-semibold">
                <span className="text-sm">SGD</span> {option.price}
              </span>
              <p className="text-xs">{option.description}</p>
            </div>

            {/* Right side with features and ticks */}
            <div className="flex flex-col items-start md:items-end md:min-w-[150px] lg:min-w-[200px] xl:mt-8 text-sm">
              <ul className="flex flex-col gap-2">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CircleCheck
                      className={`h-4 w-4 mr-2 ${
                        selectedOption === option.id
                          ? "text-background" // Color when selected
                          : "text-primary" // Default color
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
                {/* Add empty list items to match the height */}
                {Array(maxFeatures - option.features.length)
                  .fill("")
                  .map((_, index) => (
                    <li key={`empty-${index}`} className="flex items-center h-5">&nbsp;</li> // Empty li with height
                ))}
              </ul>
            </div>
          </label>
        ))}
      </div>
      <div className="flex flex-col gap-2 w-full lg:w-3/4 xl:w-3/4 md:w-3/4 [&>input]:mb-3 mt-8">
        <Label htmlFor="event_date">Event date</Label>
        <DatePicker name="event_date" minDate={calculateMinDate()} date={date} setDate={setDate}  /> {/* Pass the calculated minimum date */}
      </div>
    </>
  );
}
