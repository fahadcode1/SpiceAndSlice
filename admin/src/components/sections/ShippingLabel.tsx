import type { Order } from "../../hooks/useOrder";
import "./ShippingLabel.css";


interface ShippingLabelProps {
  order: Order;
  onClose: () => void;
}

export default function ShippingLabel({ order, onClose }: ShippingLabelProps) {
  return (
    <div className="label-overlay">
      <div className="label-modal">
        <div className="label-content" id="shipping-label">
          <h2 className="label-title">Spice & Slice</h2>
          <p className="label-sub">Shipping Label</p>

          <div className="label-section">
            <p className="label-order-id">Order #{order._id.slice(-6)}</p>
            <p className="label-date">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="label-section">
            <p className="label-heading">Deliver To</p>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.streetAddress}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p>Phone: {order.shippingAddress.phoneNumber}</p>
          </div>

          <div className="label-section">
            <p className="label-heading">Items</p>
            {order.orderItems.map((item, idx) => (
              <p key={idx}>{item.quantity} × {item.name}</p>
            ))}
          </div>

          <div className="label-section">
            <p className="label-heading">Payment</p>
            <p>{order.paymentResult.method} — ₹{order.totalPrice}</p>
          </div>
        </div>

        <div className="label-modal-actions">
          <button className="edit-submit-btn" onClick={() => window.print()}>
            Print
          </button>
          <button className="address-cancel-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}