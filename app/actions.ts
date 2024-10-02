"use server";

import { encodedRedirect, formatDate } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import axios from 'axios';

export const signUpAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: name,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard/home");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createEventAction = async (formData: FormData) => {
  const eventName = formData.get("event_name")?.toString();
  const eventType = formData.get("event_type")?.toString();
  const eventDate = formData.get("event_date")?.toString();
  const eventPackage = formData.get("event_package")?.toString();
  const supabase = createClient();

  if (!eventPackage) {
    encodedRedirect(
      "error",
      "/dashboard/events/create",
      "Please choose a plan",
    );
  }

  if (!eventDate) {
    encodedRedirect(
      "error",
      "/dashboard/events/create",
      "Please pick an event date",
    );
  }

    console.log("Event name: " + eventName);
    console.log("Event type: " + eventType);
    console.log("Event date: " + eventDate);
    console.log("Event package: " + eventPackage);
  
    // Redirect to the checkout page with query parameters
    const redirectUrl = `/dashboard/events/create/checkout?event_name=${encodeURIComponent(eventName || '')}&event_type=${encodeURIComponent(eventType || '')}&event_date=${encodeURIComponent(eventDate || '')}&event_package=${encodeURIComponent(eventPackage || '')}`;
    return redirect(redirectUrl); 

  
};

export const checkCouponAction = async (couponCode: string) => {
  const supabase = createClient();

  // Query the Supabase database to find the coupon code
  const { data, error } = await supabase
    .from("coupons")
    .select("code, discount, discount_type, active")
    .eq("code", couponCode)
    .single();

  if (error || !data) {
    // Return a message indicating that the coupon is invalid
    return { error: "Invalid coupon code" };
  }

  // Check if the coupon is active
  if (!data.active) {
    return { error: "This coupon code is no longer valid" };
  }

  // Return the discount and discount type associated with the coupon code
  return {
    discount: data.discount,
    discount_type: data.discount_type
  };
};

export const checkoutAction = async (formData: FormData) => {
  const eventName = formData.get("event_name")?.toString();
  const eventType = formData.get("event_type")?.toString();
  const eventDate = formData.get("event_date")?.toString();
  const eventPackage = formData.get("event_package")?.toString();
  const subtotal = formData.get("subtotal")?.toString();
  const coupon_code = formData.get("coupon_code")?.toString();
  const discount = formData.get("discount")?.toString();
  const total = formData.get("total")?.toString();

  // Fetch the origin from headers (to construct redirect URL)
  const origin = headers().get("origin");

  // Fetch the HitPay API key from the environment variables
  const HITPAY_API_KEY = process.env.HITPAY_API_KEY;

  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!eventName || !eventType || !eventDate || !eventPackage || !subtotal || !coupon_code || !discount || !total) {
    console.log("Redirect user back to event creation screen");
    return redirect("/dashboard/events/create");
  }
  
  // Ensure HITPAY_API_KEY is not undefined
  if (!HITPAY_API_KEY) {
    console.error("HITPAY_API_KEY is undefined. Please set it in your environment variables.");
    return { error: "Payment API key is missing. Please contact support." };
  }

  // Build the body of the request dynamically
  const options = {
    method: 'POST',
    headers: {
      'X-BUSINESS-API-KEY': HITPAY_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: formData.get("total"), // Replace with dynamic total amount from formData
      currency: "SGD",
      add_admin_fee: "true",
      payment_methods: ["paynow_online", "card"],
      email: user?.email || "unknown@example.com",
      name: user?.user_metadata.first_name || "Unknown User",
      purpose: `The Moments Archive | ${eventName} | ${formatDate(eventDate)} | ${eventPackage}`,
      redirect_url: `${origin}/api/webhook`, // Update this to your success page
      send_email: true
    })
  };

  // Await the fetch call to get the payment page URL from HitPay API
  let response;
  try {
    const hitPayResponse = await fetch('https://api.sandbox.hit-pay.com/v1/payment-requests', options);
    response = await hitPayResponse.json();
  } catch (err) {
    console.error("Error creating payment request:", err);
    return { error: "Error creating payment request. Please try again." };
  }

  if (!response || !response.url) {
    console.error("Invalid response from payment gateway:", response);
    return { error: "Could not create payment request. Please try again." };
  }

  // At this point, you have the payment URL to redirect the user
  const redirectUrl = response.url;


  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("User id:" + user?.id);
  console.log("User email:" + user?.email);
  console.log("User name:" + user?.user_metadata.first_name);
  console.log("Event name:" + eventName);
  console.log("Event type:" + eventType);
  console.log("Event date:" + eventDate);
  console.log("Event package:" + eventPackage);
  console.log("Subtotal:" + subtotal);
  console.log("Coupon code:" + coupon_code);
  console.log("Discount:" + discount);
  console.log("Total:" + total);

  
  console.log("Redirecting user to:", redirectUrl);

  // Redirect to the HitPay payment page
  return redirect(redirectUrl);

};
