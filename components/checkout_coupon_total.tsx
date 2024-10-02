"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X, Tag, TagIcon } from "lucide-react";
import { Chip } from "@nextui-org/react";
import { checkCouponAction } from "@/app/actions";

// Define the pricing options with a list of features
const packages = [
  {
    id: 1,
    name: "Base",
    price: 49.00,
    description: "Digital Guestbook",
  },
  {
    id: 2,
    name: "Plus",
    price: 99.00,
    description: "Digital Guestbook + QR Cards",
  },
];

interface CheckoutProps {
    package_name: string | string[] | undefined;    // Name prop for form submission
}

export default function CheckoutCouponTotal({ package_name }: CheckoutProps) {
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Function to apply the coupon
  async function applyCoupon() {
    const response = await checkCouponAction(couponCode);

    if (response.error) {
      alert(response.error);  // Invalid coupon
    } else {
      const { discount, discount_type } = response;

      if (discount_type === "percentage") {
        setDiscount((subtotal * discount) / 100);  // Apply percentage discount
      } else if (discount_type === "fixed") {
        setDiscount(discount);  // Apply fixed discount
      }

      setIsCouponApplied(true);
    }
  }

  // Function to apply the coupon
  function removeCoupon() {
      setCouponCode("")
      setDiscount(0);
      setIsCouponApplied(false);
  }
  // Get the price of the selected package
  const selectedPackage = packages.find((option) => option.name === package_name);
  const subtotal = selectedPackage ? selectedPackage.price : 0;
  let total = subtotal - discount;  // Calculate the total after discount
 
  // Ensure the total doesn't go below zero
  if (total < 0) {
    total = 0;
  }


  return (
    <>
      <Input
        className="w-full"
        name="coupon"
        placeholder="Enter your coupon code (optional)"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        disabled={isCouponApplied}
      />

        {!isCouponApplied && (
            <div className="flex flex-col w-full items-end">
                <Button type="button" onClick={applyCoupon}>
                Apply
                </Button>
            </div>
        )}

        {isCouponApplied && (
            <div className="flex flex-col w-full items-end">
                <Button type="button">
                <TagIcon className="w-4 h-4 mr-2"/>
                <span>{couponCode}</span>
                <X className="w-5 h-5 ml-4" onClick={removeCoupon} />
                </Button>
            </div>
        )}

        <div className="mt-12 flex flex-row w-full justify-between">
            <span>Subtotal: </span>
            <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* Conditionally show the discount div based on isCouponApplied */}
        {isCouponApplied && (
            <div className="flex flex-row w-full justify-between font-semibold">
            <span>Discount: </span>
            <span>- ${discount.toFixed(2)}</span>
            </div>
        )}

        <div className="flex flex-row w-full justify-between font-bold">
            <span>Total: </span>
            <span>${total.toFixed(2)}</span> {/* Display the total after applying discount */}
        </div>

        {/* Hidden inputs to pass values to the server */}
        <input type="hidden" name="subtotal" value={subtotal.toFixed(2)} />
        <input type="hidden" name="discount" value={discount.toFixed(2)} />
        <input type="hidden" name="total" value={total.toFixed(2)} />{/* Hidden coupon code input with conditional value */}
        <input
          type="hidden"
          name="coupon_code"
          value={isCouponApplied ? couponCode : "-"}
        />
    </>
  );
}
