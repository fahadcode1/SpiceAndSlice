// Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaXTwitter   } from "react-icons/fa6";
import "./Footer.css"

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Spice & Slice brings you the finest flavors from around the world, combining traditional recipes with modern culinary techniques.</p>
        </div>
        
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/about" onClick={scrollToTop}>About</Link></li>
          <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
          <li><Link to="/PrivacyPolicy" onClick={scrollToTop}>Privacy Policy</Link></li>
          <li><Link to="/TermsOfService" onClick={scrollToTop}>Terms of Service</Link></li>
        </ul>
      </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📍 123 Food Street, Culinary City</p>
          <p>📞 (555) 123-4567</p>
          <p>✉️ info@spiceandslice.com</p>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
              <span>Facebook</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
              <span>Instagram</span>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
              <span>X</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Spice & Slice. All rights reserved.</p>
      </div>
    </footer>
  );
}
 export default Footer