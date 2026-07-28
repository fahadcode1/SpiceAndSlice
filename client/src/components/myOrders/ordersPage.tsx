import { useNavigate } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import { BsBox2Heart } from "react-icons/bs";
import "./MyOrdersPage.css";

export const MyOrdersPage = () => {
  const navigate = useNavigate();
  const { orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <div className="page-state">
        <p className="page-state-text">Loading your orders…</p>
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

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-empty">
        <BsBox2Heart className="orders-empty-icon" />
        <h2 className="orders-empty-title">No orders yet</h2>
        <p className="orders-empty-text">
          Looks like you haven't placed an order. Explore the menu and get something delicious.
        </p>
        <button className="orders-empty-btn" onClick={() => navigate("/menu")}>
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1 className="orders-title">My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            {/* Order item rendering will go here once order shape is finalized */}
          </div>
        ))}
      </div>
    </div>
  );
};