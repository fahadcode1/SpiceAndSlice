import { useState, useEffect } from "react";

export interface Order {
  id: string;
  // TODO: add real fields once order schema is finalized (items, total, status, createdAt, etc.)
}

interface UseOrdersResult {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

export const useOrders = (): UseOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // TODO: replace with actual API call, e.g.
        // const res = await fetch(`${BASE_URL}/orders`, { credentials: "include" })
        // const data = await res.json()
        // setOrders(data.orders)

        setOrders([]); // empty for now
      } catch (err) {
        setError("Failed to load orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, isLoading, error };
};