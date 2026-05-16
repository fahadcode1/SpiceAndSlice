// hooks/useCart.js
import { useState } from "react";
import { FoodItem } from "../data/menuItems.ts";


export default function UseCart() {
  const [cart, setCart] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleCart = (food :FoodItem) => {
    setCart((prev: FoodItem[]) => {
      const exists = prev.find(item => item.id === food.id);
      const updated = exists
        ? prev.filter(item => item.id !== food.id)
        : [...prev, food];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  return { cart, toggleCart };
}