import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useOrders, type ShippingAddress } from "../hooks/useOrders";
import { usePayment } from "../hooks/usePayment";
import type { Dish } from "../hooks/useDishes";

interface IncomingItem {
  dish: Dish;
  quantity: number;
}

type PaymentMethod = "COD" | "STRIPE";

export default function CreateOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { createOrder } = useOrders();
  const { payOnline, isRedirecting, error: paymentError } = usePayment();

  const items: IncomingItem[] = (location.state as any)?.items || [];

  const [selectedAddressId, setSelectedAddressId] = useState<string>("manual");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: user ? `${user.firstName} ${user.lastName}` : "",
    phoneNumber: user?.mobileNumber || "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // user async load hota hai — jab bhi user milta hai, fullName/phoneNumber sync karo
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: `${user.firstName} ${user.lastName}`,
        phoneNumber: user.mobileNumber || "",
      }));
    }
  }, [user]);

  if (items.length === 0) {
    return (
      <div className="page-state">
        <p className="page-state-text">No items to order.</p>
      </div>
    );
  }

  const totalPrice = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    if (id === "manual") {
      setFormData((prev) => ({ ...prev, streetAddress: "", city: "", state: "", zipCode: "" }));
      return;
    }
    const addr = user?.addresses?.find((a) => a._id === id);
    if (addr) {
      setFormData((prev) => ({
        ...prev,
        streetAddress: addr.streetAddress,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipcode,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const { fullName, phoneNumber, streetAddress, city, state, zipCode } = formData;
    if (!fullName || !phoneNumber || !streetAddress || !city || !state || !zipCode) {
      setError("All address fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderItems = items.map((item) => ({
        dish: item.dish._id,
        name: item.dish.name,
        price: item.dish.price,
        quantity: item.quantity,
        image: item.dish.photoUrl,
      }));

      const order = await createOrder({
        orderItems,
        shippingAddress: formData,
        paymentMethod,
        totalPrice,
      });

      if (paymentMethod === "STRIPE") {
        // Order ban gaya, ab Stripe checkout pe redirect karo
        await payOnline(order._id);
        // payOnline khud window.location.href se redirect kar dega
      } else {
        navigate("/account/my-orders");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to place order");
      setLoading(false);
    }
  };

  const isBusy = loading || isRedirecting;

  return (
    <div className="order-page">
      <h2 className="order-title">Confirm Order</h2>

      <div className="order-items">
        {items.map((item) => (
          <p key={item.dish._id} className="edit-hint">
            {item.dish.name} × {item.quantity} — ₹{item.dish.price * item.quantity}
          </p>
        ))}
        <p className="edit-hint order-total">Total: ₹{totalPrice}</p>
      </div>

      <h3 className="order-subtitle">Delivery Address</h3>

      <div className="order-grid">
        {user?.addresses?.map((addr) => (
          <label
            key={addr._id}
            className="order-radio-row order-radio-row--full"
          >
            <input
              type="radio"
              name="addressChoice"
              checked={selectedAddressId === addr._id}
              onChange={() => handleSelectAddress(addr._id!)}
            />
            {addr.streetAddress}, {addr.city}, {addr.state} {addr.zipcode}
          </label>
        ))}

        <label className="order-radio-row order-radio-row--full">
          <input
            type="radio"
            name="addressChoice"
            checked={selectedAddressId === "manual"}
            onChange={() => handleSelectAddress("manual")}
          />
          Enter a new address
        </label>

        <label className="order-field order-field--full">
          Full Name
          <input
            className="edit-input"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            readOnly
          />
        </label>

        <label className="order-field">
          Phone Number
          <input
            className="edit-input"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            readOnly
          />
        </label>

        <label className="order-field">
          Street Address
          <input
            className="edit-input"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            disabled={selectedAddressId !== "manual"}
          />
        </label>

        <label className="order-field">
          City
          <input
            className="edit-input"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={selectedAddressId !== "manual"}
          />
        </label>

        <label className="order-field">
          State
          <input
            className="edit-input"
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled={selectedAddressId !== "manual"}
          />
        </label>

        <label className="order-field order-field--full">
          Zip Code
          <input
            className="edit-input"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            disabled={selectedAddressId !== "manual"}
          />
        </label>
      </div>

      <h3 className="order-subtitle">Payment Method</h3>

      <div className="order-payment-grid">
        <label
          className="edit-label payment-option"
          data-selected={paymentMethod === "COD"}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          <span>
            <strong>Cash on Delivery</strong>
            <small>Pay when your order arrives</small>
          </span>
        </label>

        <label
          className="edit-label payment-option"
          data-selected={paymentMethod === "STRIPE"}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === "STRIPE"}
            onChange={() => setPaymentMethod("STRIPE")}
          />
          <span>
            <strong>Pay Online</strong>
            <small>Card, iDEAL, and more via Stripe</small>
          </span>
        </label>
      </div>

      {(error || paymentError) && <p className="edit-error">{error || paymentError}</p>}

      <button className="edit-submit-btn order-submit" onClick={handlePlaceOrder} disabled={isBusy}>
        {isRedirecting
          ? "Redirecting to payment…"
          : loading
          ? "Placing Order..."
          : paymentMethod === "STRIPE"
          ? "Proceed to Payment"
          : "Place Order (Cash on Delivery)"}
      </button>
    </div>
  );
}