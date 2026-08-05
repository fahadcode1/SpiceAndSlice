import { useState } from "react";
import { useDishes, type Dish, type DishFormData } from "../../hooks/useDishes";
import "./DishesSection.css";


const emptyForm: DishFormData = {
  name: "",
  description: "",
  price: 0,
  type: "",
  offers: "",
  photoUrl: "",
  isAvailable: true,
  stock: 0,
};

export const DishesSection = () => {
  const { dishes, isLoading, error, addDish, updateDish, deleteDish } = useDishes();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<DishFormData>(emptyForm);
  const [formError, setFormError] = useState("");

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (dish: Dish) => {
    setEditingId(dish._id);
    setForm({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      type: dish.type,
      offers: dish.offers,
      photoUrl: dish.photoUrl,
      isAvailable: dish.isAvailable,
      stock: dish.stock,
    });
    setShowForm(true);
  };

  const handleChange = (field: keyof DishFormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setFormError("");
    try {
      if (editingId) {
        await updateDish(editingId, form);
      } else {
        await addDish(form);
      }
      setShowForm(false);
    } catch {
      setFormError("Failed to save dish");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this dish?")) return;
    try {
      await deleteDish(id);
    } catch {
      alert("Failed to delete dish");
    }
  };

  return (
    <div className="dishes-section">
      <div className="dishes-header">
        <h2>Dishes</h2>
        <button className="btn-primary" onClick={openAddForm}>
          + Add Dish
        </button>
      </div>

      {isLoading && <p>Loading dishes...</p>}
      {error && <p className="dishes-error">{error}</p>}

      {!isLoading && !error && (
        <div className="dishes-table-wrapper">
          <table className="dishes-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish) => (
                <tr key={dish._id}>
                  <td>{dish.name}</td>
                  <td>{dish.type}</td>
                  <td>€{dish.price}</td>
                  <td>{dish.stock}</td>
                  <td>{dish.isAvailable ? "Yes" : "No"}</td>
                  <td className="dishes-actions">
                    <button className="btn-edit" onClick={() => openEditForm(dish)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(dish._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {dishes.length === 0 && (
                <tr>
                  <td colSpan={6} className="dishes-empty">
                    No dishes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="dishes-modal-overlay">
          <div className="dishes-modal">
            <h3>{editingId ? "Update Dish" : "Add Dish"}</h3>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
            />
            <input
              placeholder="Type (e.g. veg/non-veg)"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
            />
            <input
              placeholder="Offers"
              value={form.offers}
              onChange={(e) => handleChange("offers", e.target.value)}
            />
            <input
              placeholder="Photo URL"
              value={form.photoUrl}
              onChange={(e) => handleChange("photoUrl", e.target.value)}
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => handleChange("stock", Number(e.target.value))}
            />
            <label className="dishes-checkbox">
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={(e) => handleChange("isAvailable", e.target.checked)}
              />
              Available
            </label>

            {formError && <p className="dishes-error">{formError}</p>}

            <div className="dishes-modal-actions">
              <button className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSubmit}>
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};