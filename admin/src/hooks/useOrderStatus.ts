import { useState } from "react";
import { api } from "../api/axios";
import type { Order } from "./useOrder";

export const useOrderStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateStatus = async (orderId: string, status: string): Promise<Order | null> => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.patch(`/admin/orders/${orderId}/status`, { status });
      return data.order;
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update status");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};