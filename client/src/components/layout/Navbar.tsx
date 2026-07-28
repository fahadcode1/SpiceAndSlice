import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { IoIosHome, IoMdBasket } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { useAuthStore } from "../../store/authStore";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import SearchBar from "./Searchbar";
import "./Layout.css";

type NavbarItem = {
  name: string;
  path: string;
  icon: IconType;
};

export default function NavBar() {
  const isLoggedIn = useAuthStore((state) => !!state.user);
  const { user } = useCurrentUser();
  const initial = user?.firstName?.[0]?.toUpperCase() ?? "?";

  const authItem: NavbarItem = isLoggedIn
    ? { name: initial, path: "/dashboard", icon: MdOutlineManageAccounts }
    : { name: "Login/SignUp", path: "/login", icon: FiLogIn };

  const navbarItems: NavbarItem[] = [
    { name: "Home", path: "/", icon: IoIosHome },
    { name: "Menu", path: "/menu", icon: TiThMenu },
    { name: "Cart", path: "/cart", icon: IoMdBasket },
    ...(isLoggedIn ? [{ name: "Orders", path: "account/my-orders", icon: BsBox2Heart }] : []),
    authItem,
  ];

  return (
    <div className="navbar-wrapper">
      {/* Logo */}
      <div className="navbar-logo">
        <span className="logo-icon">🍕</span>
        <span className="logo-text">
          Spice<em>&</em>Slice
        </span>
      </div>

      {/* Search */}
      <div className="navbar-searchToggle">
        <SearchBar />
      </div>

      {/* Nav items */}
      <div className="navbaritems-wrapper">
        <nav>
          <ul className="navbar-items">
            {navbarItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "navbar-btn active" : "navbar-btn"
                  }
                >
                  <span className="nav-icon">
                    <item.icon />
                  </span>
                  <span className="nav-text">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}