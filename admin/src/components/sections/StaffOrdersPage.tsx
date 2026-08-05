import { useEffect, useState } from "react";
import { useStaffOrders } from "../../hooks/useStaffOrders";
import { useOrderStatus } from "../../hooks/useOrderStatus";
import type { Order } from "../../hooks/useOrder";
import { api } from "../../api/axios";
import ShippingLabel from "./ShippingLabel";
import VerifyPaymentModal from "../../pages/VerifyPaymentModal";
import "./StaffOrdersPage.css";

const NEXT_STATUS: Record<string, string | null> = {
  pending: "approved",
  approved: "cooking",
  cooking: "packing",
  packing: "out_for_delivery",
  out_for_delivery: "payment_completed",
  payment_completed: "order_completed",
  order_completed: null,
  cancelled: null,
};

const PREV_STATUS: Record<string, string | null> = {
  pending: null,
  approved: "pending",
  cooking: "approved",
  packing: "cooking",
  out_for_delivery: "packing",
  payment_completed: "out_for_delivery",
  order_completed: "payment_completed",
  cancelled: null,
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  cooking: "Cooking",
  packing: "Packing",
  out_for_delivery: "Out for Delivery",
  payment_completed: "Payment Completed",
  order_completed: "Order Completed",
  cancelled: "Cancelled",
};

export default function StaffOrdersPage() {
  const { orders, isLoading, error, fetchAllOrders } = useStaffOrders();
  const { updateStatus, loading: updating } = useOrderStatus();
  const [localOrders, setLocalOrders] = useState<Order[]>([]);
  const [labelOrder, setLabelOrder] = useState<Order | null>(null);
  const [verifyModalOrder, setVerifyModalOrder] = useState<Order | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleAdvance = async (order: Order) => {
    const next = NEXT_STATUS[order.status];
    if (!next) return;
    const updated = await updateStatus(order._id, next);
    if (updated) {
      setLocalOrders((prev) => prev.map((o) => (o._id === order._id ? updated : o)));
    }
  };

  const handleRevert = async (order: Order) => {
    const prev = PREV_STATUS[order.status];
    if (!prev) return;
    const confirmed = window.confirm(`Revert order #${order._id.slice(-6)} back to "${STATUS_LABEL[prev]}"?`);
    if (!confirmed) return;
    const updated = await updateStatus(order._id, prev);
    if (updated) {
      setLocalOrders((prevOrders) => prevOrders.map((o) => (o._id === order._id ? updated : o)));
    }
  };

  const handleConfirmVerify = async () => {
    if (!verifyModalOrder) return;
    setVerifying(true);
    try {
      const { data } = await api.patch(`/admin/orders/${verifyModalOrder._id}/verify-payment`);
      if (data.success) {
        setLocalOrders((prev) => prev.map((o) => (o._id === verifyModalOrder._id ? data.order : o)));
        setVerifyModalOrder(null);
      }
    } catch (err) {
      console.error("Verify payment failed:", err);
    } finally {
      setVerifying(false);
    }
  };

  if (isLoading) return <p className="page-state-text">Loading orders…</p>;
  if (error) return <p className="page-state-text page-state-error">{error}</p>;

  const activeOrders = localOrders.filter((o) => o.status !== "order_completed" && o.status !== "cancelled");
  const pendingVerificationCount = activeOrders.filter(
    (o) => o.paymentResult.method === "STRIPE" && o.paymentResult.status === "paid"
  ).length;

  return (
    <div className="page">
      <h1 className="page-name">Staff — Orders</h1>

      {pendingVerificationCount > 0 && (
        <div className="payment-banner payment-banner--pending">
          ⏳ {pendingVerificationCount} order{pendingVerificationCount > 1 ? "s" : ""} awaiting payment verification.
        </div>
      )}

      <div className="page-card">
        <div className="page-card-header">
          <span className="page-card-title">Active Orders</span>
        </div>

        {activeOrders.length === 0 && <p className="edit-hint">No active orders.</p>}

        <div className="staff-order-list">
          {activeOrders.map((order) => {
            const needsVerification =
              order.paymentResult.method === "STRIPE" && order.paymentResult.status === "paid";

            return (
              <div
                className={`staff-order-item ${needsVerification ? "staff-order-item--needs-verification" : ""}`}
                key={order._id}
              >
                <div className="staff-order-info">
                  <p className="staff-order-id">Order #{order._id.slice(-6)}</p>
                  <p className="edit-hint">{STATUS_LABEL[order.status]}</p>
                  <p className="edit-hint">Total: €{order.totalPrice}</p>
                  <p className="edit-hint">{order.shippingAddress.fullName} — {order.shippingAddress.phoneNumber}</p>
                  <p className={`edit-hint ${needsVerification ? "payment-flag" : ""}`}>
                    Payment: {order.paymentResult.method === "STRIPE"
                      ? order.paymentResult.status === "verified"
                        ? "Online — Verified ✓"
                        : order.paymentResult.status === "paid"
                        ? "⚠ Online — Awaiting Verification"
                        : "Online — Not Paid Yet"
                      : "Cash on Delivery"}
                  </p>
                </div>
                <div className="staff-order-actions">
                  {needsVerification && (
                    <button
                      className="field-edit-btn field-edit-btn--verify-alert"
                      onClick={() => setVerifyModalOrder(order)}
                    >
                      ⚠ Verify Payment
                    </button>
                  )}

                  {PREV_STATUS[order.status] && (
                    <button
                      className="field-edit-btn field-edit-btn--revert"
                      disabled={updating}
                      onClick={() => handleRevert(order)}
                    >
                      ↩ Revert to {STATUS_LABEL[PREV_STATUS[order.status]!]}
                    </button>
                  )}
                  {NEXT_STATUS[order.status] && (
                    <button
                      className="field-edit-btn field-edit-btn--advance"
                      disabled={updating}
                      onClick={() => handleAdvance(order)}
                    >
                      Mark as {STATUS_LABEL[NEXT_STATUS[order.status]!]}
                    </button>
                  )}
                  <button className="field-edit-btn field-edit-btn--label" onClick={() => setLabelOrder(order)}>
                    Print Label
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {labelOrder && (
        <ShippingLabel order={labelOrder} onClose={() => setLabelOrder(null)} />
      )}

      {verifyModalOrder && (
        <VerifyPaymentModal
          order={verifyModalOrder}
          onConfirm={handleConfirmVerify}
          onCancel={() => setVerifyModalOrder(null)}
          loading={verifying}
        />
      )}
    </div>
  );
}