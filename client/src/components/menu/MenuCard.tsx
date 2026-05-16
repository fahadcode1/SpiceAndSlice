import { FoodItem } from "../../data/menuItems.ts";


interface MenuCardProps {
  food: FoodItem;
  index: number;
  inCart: boolean;
  onToggleCart: (food: FoodItem) => void;
}


export default function MenuCard({ food, index, inCart, onToggleCart }: MenuCardProps) {

  return (
    <div className="menu-card" key={food.id}
      style={{ animationDelay: `${Math.min(index * 0.07, 0.4)}s` }}
    >
      <div className="menu-card-image">
        <img src={food.photo} />
      </div>
      <div className="menu-card-content">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{food.title}</h3>
          <span className="menu-card-price">₹{food.price}</span>
        </div>
        <p className="menu-card-description">{food.description}</p>
        <div className="menu-card-footer">
          <span className={`menu-type ${food.type}`}>{food.type}</span>
          {food.featured && <span className="menu-featured">⭐ Featured</span>}
        </div>
        <button className="order-btn">Order Now</button>
        <button
          className={`cart-btn ${inCart ? "in-cart" : ""}`}
          onClick={() => onToggleCart(food)}
        >
          {inCart ? "✓ In Cart" : "🛒 Add to Cart"}
        </button>
      </div>
    </div>
  );
}