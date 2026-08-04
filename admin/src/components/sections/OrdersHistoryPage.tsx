import { useEffect } from "react";
import { useOrders } from "../../hooks/useOrder";


const STATUS_LABEL: Record<string, string> = {
  order_completed: "Order Completed",
};

export default function OrderHistoryPage() {
  const { orders, isLoading, error, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading) {
    return (
      <div className="page-state">
        <p className="page-state-text">Loading order history…</p>
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

  const completedOrders = orders.filter((order) => order.status === "order_completed");

  if (completedOrders.length === 0) {
    return (
      <div className="page-state">
        <p className="page-state-text">No completed orders yet.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-name">Order History</h1>

      {completedOrders.map((order) => {
        const totalPrice = order.orderItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return (
          <div className="page-card" key={order._id}>
            <div className="page-card-header">
              <span className="page-card-title">Order #{order._id.slice(-6)}</span>
              <span className="edit-hint">{STATUS_LABEL[order.status]}</span>
            </div>

            <dl className="page-info-grid">
              {order.orderItems.map((item, idx) => (
                <div className="page-info-row" key={idx}>
                  <dt>{item.name}</dt>
                  <dd>
                    <span>
                      {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                    </span>
                  </dd>
                </div>
              ))}
              <div className="page-info-row">
                <dt>Total</dt>
                <dd><span>₹{totalPrice}</span></dd>
              </div>
              <div className="page-info-row">
                <dt>Delivered To</dt>
                <dd>
                  <span>
                    {order.shippingAddress.fullName}, {order.shippingAddress.streetAddress}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </span>
                </dd>
              </div>
              <div className="page-info-row">
                <dt>Ordered On</dt>
                <dd><span>{new Date(order.createdAt).toLocaleDateString()}</span></dd>
              </div>
            </dl>
          </div>
        );
      })}
    </div>
  );
}