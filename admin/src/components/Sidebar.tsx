import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useAuthStore } from "../store/authStore";
import "./Sidebar.css";

const navItems = [
  { to: "/dashboard/dishes", label: "Dishes" },
  { to: "/dashboard/orders", label: "Orders" },
  { to: "/dashboard/admins", label: "Admin List" },
  { to: "/dashboard/order-history", label: "Order-History" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.handleLogout);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="dashboard-sidebar">
      <h2 className="sidebar-title">Spice & Slice</h2>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active sidebar-profile" : "sidebar-link sidebar-profile"
          }
        >
          <i className="ti ti-user" />
          <span>My Profile</span>
        </NavLink>

        <button className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};