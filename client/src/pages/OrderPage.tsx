import { useEffect } from "react";
import { useOrders } from "../hooks/useOrders";
import './Pages.css'

export default function OrdersPage() {
  const { orders, isLoading, error, fetchOrders, cancelOrder } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading) {
    return (
      <div className="page-state">
        <p className="page-state-text">Loading orders…</p>
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

  if (orders.length === 0) {
    return (
      <div className="page-state">
        <p className="page-state-text">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-name">Your Orders</h1>

      {orders.map((order) => (
        <div className="page-card" key={order._id}>
          <div className="page-card-header">
            <span className="page-card-title">Order #{order._id.slice(-6)}</span>
            <span className="edit-hint">{order.status.toUpperCase()}</span>
          </div>

          <dl className="page-info-grid">
            {order.orderItems.map((item, idx) => (
              <div className="page-info-row" key={idx}>
                <dt>{item.name}</dt>
                <dd>
                  <span>{item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}</span>
                </dd>
              </div>
            ))}
            <div className="page-info-row">
              <dt>Total</dt>
              <dd><span>₹{order.totalPrice}</span></dd>
            </div>
            <div className="page-info-row">
              <dt>Delivery Address</dt>
              <dd>
                <span>
                  {order.shippingAddress.fullName}, {order.shippingAddress.streetAddress}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </span>
              </dd>
            </div>
          </dl>

          {order.status === "pending" && (
            <button className="field-edit-btn" onClick={() => cancelOrder(order._id)}>
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}