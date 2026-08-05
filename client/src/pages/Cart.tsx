import { useCart } from "../hooks/useCart";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useNavigate, Link } from "react-router-dom";
import "./Pages.css";

export default function CartPage() {
  const { cart, isLoading, error, removeFromCart } = useCart();
  const { user, isLoading: userLoading } = useCurrentUser();
  const navigate = useNavigate();

  if (isLoading || userLoading) {
    return (
      <div className="page-state">
        <p className="page-state-text">Loading cart…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-state">
        <p className="page-state-text page-state-error">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-state">
        <p className="page-state-text">Please log in to view your cart.</p>
        <Link to="/login" className="cart-browse-btn">
          Go to Login
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page-state">
        <p className="page-state-text">Your cart is empty.</p>
        <button className="cart-browse-btn" onClick={() => navigate("/menu")}>
          Browse Menu
        </button>
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.dish._id}>
            <img
              src={item.dish.photoUrl}
              alt={item.dish.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.dish.name}</h3>
              <p className="cart-item-price">
                €{item.dish.price} × {item.quantity} = €
                {item.dish.price * item.quantity}
              </p>
            </div>
            <button
              className="cart-remove-btn"
              onClick={() => removeFromCart(item.dish._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <span className="cart-total">Total: €{totalPrice}</span>
        <button className="cart-checkout-btn" onClick={() => navigate("/create-order", { state: { items: cart } })}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}