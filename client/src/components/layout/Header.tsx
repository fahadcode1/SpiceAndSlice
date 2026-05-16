import { FaHeadset, FaGlobe, FaChevronDown  } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="topbar">
        <div className="topbar-inner">

          {/* LEFT */}
          <div className="topbar-left">
            <span className="pulse-dot"></span>
            <span className="topbar-promo">
              Limited Time: <strong>Up to 60% Off</strong>
            </span>
          </div>

          {/* RIGHT */}
          <div className="topbar-right">
            <Link to="/support" className="topbar-link">
              <FaHeadset className="topbar-icon" />
              <span>Support</span>
            </Link>

            <div className="topbar-divider"></div>

            <Link to="/language" className="topbar-link">
              <FaGlobe className="topbar-icon" />
              <span>EN</span>
              <FaChevronDown className="topbar-chevron" />
            </Link>

            <div className="topbar-divider"></div>

            <Link to="/track" className="topbar-link">
              <MdOutlineDeliveryDining className="topbar-icon" />
              <span>Track Order</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
export default Header