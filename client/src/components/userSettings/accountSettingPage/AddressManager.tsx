import { useState, useEffect } from "react";
import { api } from "../../../lib/api";
import type { Address } from "../../../services/authService";
import "./AddressManager.css";



const emptyAddress: Address = {
  streetAddress: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
};

interface AddressManagerProps {
  initialAddresses: Address[];
}

export const AddressManager = ({ initialAddresses }: AddressManagerProps) => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses || []);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Address>(emptyAddress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setAddresses(initialAddresses || []);
  }, [initialAddresses]);

  const openAddForm = () => {
    setFormData(emptyAddress);
    setEditingId(null);
    setFormOpen(true);
    setError("");
  };

  const openEditForm = (address: Address) => {
    setFormData(address);
    setEditingId(address._id || null);
    setFormOpen(true);
    setError("");
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setFormData(emptyAddress);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async () => {
    const { streetAddress, city, state, zipcode, country } = formData;
    if (!streetAddress || !city || !state || !zipcode || !country) {
        setError("All fields are required");
        return;
    }

    setLoading(true);
    setError("");

    try {
        if (editingId) {
        const res = await api.put(`/user/address/${editingId}`, formData);
        setAddresses(res.data.addresses);
        } else {
        const res = await api.post(`/user/address`, formData);
        setAddresses(res.data.addresses);
        }
        closeForm();
    } catch (err: any) {
        setError(err?.response?.data?.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
    };

    const handleDelete = async (addressId?: string) => {
    if (!addressId) return;
    setLoading(true);
    try {
        const res = await api.delete(`/user/address/${addressId}`);
        setAddresses(res.data.addresses);
    } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to delete address");
    } finally {
        setLoading(false);
    }
    };

  if (formOpen) {
  return (
    <div className="addr-card">
      <div className="addr-header">
        <span className="addr-title">{editingId ? "Edit Address" : "Add Address"}</span>
      </div>

      <div className="addr-form">
        <label className="addr-label">
          Street Address
          <input className="addr-input" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
        </label>

        <div className="addr-form-row">
          <label className="addr-label">
            City
            <input className="addr-input" name="city" value={formData.city} onChange={handleChange} />
          </label>
          <label className="addr-label">
            State
            <input className="addr-input" name="state" value={formData.state} onChange={handleChange} />
          </label>
        </div>

        <div className="addr-form-row">
          <label className="addr-label">
            Zip Code
            <input className="addr-input" name="zipcode" value={formData.zipcode} onChange={handleChange} />
          </label>
          <label className="addr-label">
            Country
            <input className="addr-input" name="country" value={formData.country} onChange={handleChange} />
          </label>
        </div>

        {error && <p className="addr-error">{error}</p>}

        <div className="addr-form-actions">
          <button className="addr-add-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Address" : "Save Address"}
          </button>
          <button className="addr-cancel-btn" onClick={closeForm}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="addr-card">
    <div className="addr-header">
      <span className="addr-title">Addresses</span>
      <button className="addr-add-btn" onClick={openAddForm}>+ Add Address</button>
    </div>

    {addresses.length === 0 && <p className="addr-empty">No addresses added yet.</p>}

    <div className="addr-list">
      {addresses.map((addr) => (
        <div key={addr._id} className="addr-item">
          <span className="addr-item-text">
            {addr.streetAddress}, {addr.city}, {addr.state} {addr.zipcode}, {addr.country}
          </span>
          <div className="addr-item-actions">
            <button className="addr-action-btn edit" onClick={() => openEditForm(addr)}>
              <i className="ti ti-pencil" /> Edit
            </button>
            <button className="addr-action-btn delete" onClick={() => handleDelete(addr._id)}>
              <i className="ti ti-trash" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}