import { useState } from "react";
import type { Order } from "../hooks/useOrder";

interface Props {
  order: Order;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function VerifyPaymentModal({ order, onConfirm, onCancel, loading }: Props) {
  const [checkedDashboard, setCheckedDashboard] = useState(false);
  const [checkedAmount, setCheckedAmount] = useState(false);

  const canConfirm = checkedDashboard && checkedAmount;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Verify Payment — Order #{order._id.slice(-6)}</h3>
        <p className="edit-hint" style={{ marginBottom: "16px" }}>
          Total: ₹{order.totalPrice} · Payment ID: {order.paymentResult.id || "N/A"}
        </p>

        <label className="modal-checkbox-row">
          <input
            type="checkbox"
            checked={checkedDashboard}
            onChange={(e) => setCheckedDashboard(e.target.checked)}
          />
          <span>I have checked the Stripe dashboard and confirmed this payment was received.</span>
        </label>

        <label className="modal-checkbox-row">
          <input
            type="checkbox"
            checked={checkedAmount}
            onChange={(e) => setCheckedAmount(e.target.checked)}
          />
          <span>I confirm the amount received matches ₹{order.totalPrice}.</span>
        </label>

        <div className="modal-actions">
          <button className="address-cancel-btn" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="edit-submit-btn"
            onClick={onConfirm}
            disabled={!canConfirm || loading}
          >
            {loading ? "Verifying…" : "Confirm & Verify"}
          </button>
        </div>
      </div>
    </div>
  );
}