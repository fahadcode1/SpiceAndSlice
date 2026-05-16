import { IconType } from "react-icons";
import { NavLink} from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { IoIosHome, IoMdBasket } from "react-icons/io";
import SearchBar from "./Searchbar";
import "./Layout.css";

type NavbarItem = {
  name: string;
  path: string;
  icon: IconType;
};

export default function NavBar() {

  const navbarItems : NavbarItem[] = [
    { name: "Home", path: "/", icon: IoIosHome },
    { name: "Menu", path: "/menu", icon: TiThMenu  },
    { name: "Cart", path: "/cart", icon: IoMdBasket},
    { name: "Login/SignUp", path: "/login", icon: FiLogIn }
  ];

  return (
     
      <div className="navbar-wrapper">

        {/*  Logo */}
          <div className="navbar-logo">
            <span className="logo-icon">🍕</span>
            <span className="logo-text">Spice<em>&</em>Slice</span>
          </div>

        {/*  Search */}
        <div className="navbar-searchToggle">
          <SearchBar />
        </div>

        {}
        <div className="navbaritems-wrapper">
          <nav>
            <ul className="navbar-items">
              {navbarItems.map((item) => (
                <li key={item.name}>
                  
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "navbar-btn active" : "navbar-btn"
                    }
                  >
                    <span className="nav-icon"><item.icon/></span>
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