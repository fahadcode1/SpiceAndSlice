import { useState, useEffect, useCallback } from "react";
import { api } from "../lib/api";
import { Dish } from "./useDishes";

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.get("/user/cart");
      setCart(data.cart.items);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        // user not logged in — not a real error, just empty cart
        setCart([]);
      } else {
        setError("Failed to load cart");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToCart = async (dishId: string, quantity: number = 1) => {
    const { data } = await api.post("/user/cart", { dishId, quantity });
    setCart(data.cart.items);
  };

  const removeFromCart = async (dishId: string) => {
    const { data } = await api.delete(`user/cart/${dishId}`);
    setCart(data.cart.items);
  };

  const toggleCart = async (dish: Dish) => {
    try {
      const existing = cart.find((item) => item.dish._id === dish._id);
      if (existing) {
        await removeFromCart(dish._id);
      } else {
        await addToCart(dish._id, 1);
      }
    } catch (err) {
      console.error("Cart action failed:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return { cart, isLoading, error, fetchCart, addToCart, removeFromCart, toggleCart };
};