import { useState } from "react";
import { api } from "../lib/api";

export const usePayment = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");

  const payOnline = async (orderId: string) => {
    setIsRedirecting(true);
    setError("");
    try {
      const { data } = await api.post("/user/payments/create-checkout-session", { orderId });
      if (data.url) {
        window.location.href = data.url; // Stripe ke hosted checkout page pe redirect
      } else {
        setError("Failed to start payment");
        setIsRedirecting(false);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to start payment");
      setIsRedirecting(false);
    }
  };

  return { payOnline, isRedirecting, error };
};