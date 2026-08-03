import { useState, useCallback } from "react";
import { api } from "../lib/api";
import { Dish } from "./useDishes";

export interface OrderItemPayload {
  dish: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingAddress {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface Order {
  _id: string;
  orderItems: (OrderItemPayload & { dish: Dish })[];
  shippingAddress: ShippingAddress;
  paymentResult: { method: string };
  totalPrice: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.get("/user/orders");
      setOrders(data.orders);
    } catch {
      setError("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createOrder = async (payload: {
    orderItems: OrderItemPayload[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    totalPrice: number;
  }) => {
    const { data } = await api.post("/user/orders", payload);
    return data.order;
  };

  const cancelOrder = async (orderId: string) => {
    const { data } = await api.patch(`user/orders/${orderId}/cancel`);
    setOrders((prev) => prev.map((o) => (o._id === orderId ? data.order : o)));
  };

  return { orders, isLoading, error, fetchOrders, createOrder, cancelOrder };
};