import { useState, useCallback } from "react";
import { api } from "../api/axios";
import type { Order } from "./useOrder";
export const useStaffOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllOrders = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.get("/admin/orders");
      setOrders(data.orders);
    } catch {
      setError("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { orders, isLoading, error, fetchAllOrders };
};