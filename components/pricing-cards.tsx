'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // shadcn Card components

const packages = [
  {
    title: "Essential",
    price: "49",
    features: ["Feature A", "Feature B", "Feature C"],
  },
  {
    title: "Premium",
    price: "99",
    features: ["Feature A", "Feature B", "Feature C", "Feature D", "Feature E"],
  }
];

export default function PricingRadio() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const handlePlanChange = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {packages.map((pkg) => (
        <label key={pkg.title} className="cursor-pointer w-full">
          <input
            type="radio"
            name="pricing"
            value={pkg.title}
            className="hidden"
            checked={selectedPlan === pkg.title}
            onChange={() => handlePlanChange(pkg.title)}
          />
          <Card
            className={`transition-all ${
              selectedPlan === pkg.title
                ? "border-primary shadow-md scale-100 bg-primary/10"
                : "border-gray-300 scale-95"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex justify-between mb-3">
                <span>{pkg.title}</span>
                <span className="ml-28 text-sm text-red-600">{pkg.title === "Premium" ? "*Only available in Singapore" : ""}</span>
              </CardTitle>
              <CardDescription>
              <span className="text-primary text-3xl font-bold"><span className="text-lg">SGD</span> {pkg.price}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </label>
      ))}
    </div>
  );
}
