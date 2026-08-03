import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useOrders, ShippingAddress } from "../hooks/useOrders";
import { Dish } from "../hooks/useDishes";

interface IncomingItem {
  dish: Dish;
  quantity: number;
}

export default function CreateOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { createOrder } = useOrders();

  const items: IncomingItem[] = (location.state as any)?.items || [];

  const [selectedAddressId, setSelectedAddressId] = useState<string>("manual");
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

     await createOrder({
        orderItems,
        shippingAddress: formData,
        paymentMethod: "COD",
        totalPrice,
      });

      navigate("/account/my-orders");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-card">
      <h2 className="edit-title">Confirm Order</h2>

      <div className="edit-form">
        {items.map((item) => (
          <p key={item.dish._id} className="edit-hint">
            {item.dish.name} × {item.quantity} — ₹{item.dish.price * item.quantity}
          </p>
        ))}
        <p className="edit-hint" style={{ fontWeight: 600 }}>Total: ₹{totalPrice}</p>
      </div>

      <h3 className="edit-title" style={{ fontSize: "15px", marginTop: "20px" }}>Delivery Address</h3>

      <div className="edit-form">
        {user?.addresses?.map((addr) => (
          <label key={addr._id} className="edit-label" style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
            <input
              type="radio"
              name="addressChoice"
              checked={selectedAddressId === addr._id}
              onChange={() => handleSelectAddress(addr._id!)}
            />
            {addr.streetAddress}, {addr.city}, {addr.state} {addr.zipcode}
          </label>
        ))}
        <label className="edit-label" style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
          <input
            type="radio"
            name="addressChoice"
            checked={selectedAddressId === "manual"}
            onChange={() => handleSelectAddress("manual")}
          />
          Enter a new address
        </label>

        <label className="edit-label">
          Full Name
          <input
            className="edit-input"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            readOnly
          />
        </label>
        <label className="edit-label">
          Phone Number
          <input
            className="edit-input"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            readOnly
          />
        </label>
        <label className="edit-label">
          Street Address
          <input className="edit-input" name="streetAddress" value={formData.streetAddress} onChange={handleChange} disabled={selectedAddressId !== "manual"} />
        </label>
        <label className="edit-label">
          City
          <input className="edit-input" name="city" value={formData.city} onChange={handleChange} disabled={selectedAddressId !== "manual"} />
        </label>
        <label className="edit-label">
          State
          <input className="edit-input" name="state" value={formData.state} onChange={handleChange} disabled={selectedAddressId !== "manual"} />
        </label>
        <label className="edit-label">
          Zip Code
          <input className="edit-input" name="zipCode" value={formData.zipCode} onChange={handleChange} disabled={selectedAddressId !== "manual"} />
        </label>

        {error && <p className="edit-error">{error}</p>}

        <button className="edit-submit-btn" onClick={handlePlaceOrder} disabled={loading}>
          {loading ? "Placing Order..." : "Place Order (Cash on Delivery)"}
        </button>
      </div>
    </div>
  );
}