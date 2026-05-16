import myfoodmenu from "../../data/menuItems.ts";
import { FoodItem } from "../../data/menuItems.ts";
import MenuCard from "./MenuCard.tsx";
import UseCart from "../../hooks/Cart.tsx";
import { useState } from 'react';
import "./Menu.css"
type FilterType = "all" | "veg" | "nonveg" | "dessert";


export default function MenuDishes({ featuredOnly = false }) {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const { cart, toggleCart } = UseCart();

  const displayMenu = myfoodmenu
    .filter(food => featuredOnly ? food.featured : true)
    .filter(food => filterType === "all" || food.type === filterType);

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
            key={food.id}
            food={food}
            index={index}
            inCart={cart.some((item : FoodItem) => item.id === food.id)}
            onToggleCart={toggleCart}
          />
        ))}
      </div>
    </div>
  );
}