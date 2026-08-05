import { Dish } from "../../hooks/useDishes";

interface MenuCardProps {
  food: Dish;
  index: number;
  inCart: boolean;
  onToggleCart: (food: Dish) => void;
  onOrderNow: (food: Dish) => void;
}

export default function MenuCard({ food, index, inCart, onToggleCart, onOrderNow }: MenuCardProps) {
  return (
    <div
      className="menu-card"
      key={food._id}
      style={{ animationDelay: `${Math.min(index * 0.07, 0.4)}s` }}
    >
      <div className="menu-card-image">
        <img src={food.photoUrl} alt={food.name} />
      </div>
      <div className="menu-card-content">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{food.name}</h3>
          <span className="menu-card-price">€{food.price}</span>
        </div>
        <p className="menu-card-description">{food.description}</p>
        <div className="menu-card-footer">
          <span className={`menu-type ${food.type}`}>{food.type}</span>
          {food.offers && <span className="menu-featured">🏷️ {food.offers}</span>}
        </div>
        <button
          className="order-btn"
          disabled={!food.isAvailable}
          onClick={() => onOrderNow(food)}
        >
          {food.isAvailable ? "Order Now" : "Unavailable"}
        </button>
        <button
          className={`cart-btn ${inCart ? "in-cart" : ""}`}
          onClick={() => onToggleCart(food)}
          disabled={!food.isAvailable}
        >
          {inCart ? "✓ In Cart" : "🛒 Add to Cart"}
        </button>
      </div>
    </div>
  );
}