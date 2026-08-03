import { useState, useEffect, useCallback } from "react";
import { api } from "../api/axios";

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
      const { data } = await api.get("/admin/dishes");
      setDishes(data.dishes);
    } catch {
      // setError("Failed to load dishes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addDish = async (form: DishFormData) => {
    const { data } = await api.post("/admin/dishes", form);
    setDishes((prev) => [...prev, data.data]);
  };

  const updateDish = async (id: string, form: Partial<DishFormData>) => {
    const { data } = await api.patch(`/admin/dishes/${id}`, form);
    setDishes((prev) => prev.map((d) => (d._id === id ? data.dish : d)));
  };

  const deleteDish = async (id: string) => {
    await api.delete(`/admin/dishes/${id}`);
    setDishes((prev) => prev.filter((d) => d._id !== id));
  };

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return { dishes, isLoading, error, fetchDishes, addDish, updateDish, deleteDish };
};