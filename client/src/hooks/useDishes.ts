import { useState, useEffect, useCallback } from "react";
import { api } from "../lib/api";

export interface Dish {
  _id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  offers: string;
  photoUrl: string;
  isAvailable: boolean;
  stock: number;
}

export type DishFormData = Omit<Dish, "_id">;

export const useDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDishes = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.get("/user/dishes");
      setDishes(data.dishes);
    } catch {
    //   setError("Failed to load dishes");
    } finally {
      setIsLoading(false);
    }
  }, []);



  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return { dishes, isLoading, error, fetchDishes };
};