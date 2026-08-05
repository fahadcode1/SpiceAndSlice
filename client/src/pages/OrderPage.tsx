import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import { usePayment } from "../hooks/usePayment";
import "./styles/OrdersPage.css";

export default function OrdersPage() {
  const { orders, isLoading, error, fetchOrders, cancelOrder } = useOrders();
  const { payOnline, isRedirecting, error: paymentError } = usePayment();
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Success message dikhne ke baad URL se query param clear kar do (taaki refresh pe dobara na dikhe)
  useEffect(() => {
    if (paymentStatus) {
      const timer = setTimeout(() => {
        setSearchParams({}, { replace: true });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, setSearchParams]);

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
      {paymentStatus === "success" && (
        <div className="payment-banner payment-banner--success">
          ✓ Payment successful! Your order is being processed.
        </div>
      )}
      {paymentStatus === "cancelled" && (
        <div className="payment-banner payment-banner--cancelled">
          Payment was cancelled. You can retry from your order.
        </div>
      )}

      {paymentError && (
        <div className="payment-banner payment-banner--cancelled">
          {paymentError}
        </div>
      )}

      <h1 className="page-name">Your Orders</h1>

      {orders.map((order) => {
        const needsPayment =
          order.paymentResult.method === "STRIPE" &&
          order.paymentResult.status !== "verified" &&
          order.paymentResult.status !== "paid";

        return (
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
                    <span>{item.quantity} × €{item.price} = €{item.quantity * item.price}</span>
                  </dd>
                </div>
              ))}
              <div className="page-info-row">
                <dt>Total</dt>
                <dd><span>€{order.totalPrice}</span></dd>
              </div>
              <div className="page-info-row">
                <dt>Payment</dt>
                <dd>
                  <span>
                    {order.paymentResult.method === "STRIPE"
                      ? order.paymentResult.status === "verified"
                        ? "Paid & Verified ✓"
                        : order.paymentResult.status === "paid"
                        ? "Paid (verification pending)"
                        : "Payment pending"
                      : "Cash on Delivery"}
                  </span>
                </dd>
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

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {needsPayment && (
                <button
                  className="edit-paynow-submit-btn"
                  onClick={() => payOnline(order._id)}
                  disabled={isRedirecting}
                >
                  {isRedirecting ? "Redirecting to payment…" : "Pay Now"}
                </button>
              )}

              {order.status === "pending" && (
                <button className="field-edit-btn" onClick={() => cancelOrder(order._id)}>
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}