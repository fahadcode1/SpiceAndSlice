import { useDishes } from "../../hooks/useDishes";
import MenuCard from "./MenuCard";
import { useCart } from "../../hooks/useCart";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dish } from "../../hooks/useDishes";
import "./Menu.css";

type FilterType = "all" | "veg" | "nonveg" | "dessert";

export default function MenuDishes({ featuredOnly = false }) {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const { dishes, isLoading, error } = useDishes();
  const { cart, toggleCart } = useCart();
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  const displayMenu = dishes
    .filter((food) => (featuredOnly ? food.offers : true))
    .filter((food) => filterType === "all" || food.type === filterType);

  const handleToggleCart = (food: (typeof dishes)[number]) => {
    toggleCart(food);
  };

  
    const handleOrderNow = (food: Dish) => {
      if (!user) {
        navigate("/login");
        return;
      }
      navigate("/create-order", { state: { items: [{ dish: food, quantity: 1 }] } });
    };

  if (isLoading) {
    return <p className="menu-heading">Loading menu…</p>;
  }

  if (error) {
    return <p className="menu-heading">{error}</p>;
  }

  return (
    <div className="menu-container">
      <h1 className="menu-heading">{featuredOnly ? "Our Featured Menu" : "Our Menu"}</h1>

      {!featuredOnly && (
        <div className="menu-filters-btns">
          <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
          <button onClick={() => setFilterType("veg")} className={filterType === "veg" ? "active" : ""}>Veg</button>
          <button onClick={() => setFilterType("nonveg")} className={filterType === "nonveg" ? "active" : ""}>Non-Veg</button>
          <button onClick={() => setFilterType("dessert")} className={filterType === "dessert" ? "active" : ""}>Dessert</button>
        </div>
      )}

      <div className="menu-grid" key={filterType}>
        {displayMenu.map((food, index) => (
          <MenuCard
            key={food._id}
            food={food}
            index={index}
            inCart={cart.some((item) => item.dish._id === food._id)}
            onToggleCart={handleToggleCart}
            onOrderNow={handleOrderNow}
          />
        ))}
      </div>
    </div>
  );
}