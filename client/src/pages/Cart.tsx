import { useState } from "react";
import "./Pages.css";

interface Values {
  id: number
  title: string
  description: string
  price: number
  photo: string
  type: string
  featured: boolean
}

export default function Cart() {

  const [cart, setCart] = useState<Values[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const removeItem = (id:number) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <p>Go add some food!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="menu-heading">Your Cart</h1>

      <div className="cart-grid">
        {cart.map(food => (
          <div className="cart-card" key={food.id}>

            <div className="cart-card-image">
              <img src={food.photo} />
            </div>

            <div className="cart-card-content">
              <div className="cart-card-header">
                <h3 className="cart-card-title">{food.title}</h3>
                <span className="menu-card-price">₹{food.price}</span>
              </div>

              <p className="menu-card-description">{food.description}</p>

              <div className="cart-card-footer">
                <span className={`menu-type ${food.type}`}>{food.type}</span>
                {food.featured && <span className="menu-featured">⭐ Featured</span>}
              </div>

              <button className="remove-btn" onClick={() => removeItem(food.id)}>
                Remove
              </button>
            </div>

          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button className="order-btn" style={{ maxWidth: "300px" }}>
          Proceed to Checkout
        </button>
        <button className="remove-btn clear-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

    </div>
  );
}