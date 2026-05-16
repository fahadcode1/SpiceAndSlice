import "./Home.css";
import { MdOutlineDeliveryDining } from "react-icons/md";
import FoodLogo from "../../assets/herofoodimg.png"

const Hero = () => {
  return (
    <section className="hero-section">

      <div className='hero-content'>
        <p className='hero-upper-text'>
          <span className="badge">⚡ LIMITED TIME</span>
        </p>
        
        <h1 className="hero-title">
          Grab Big Deals <br />
          on <span className="title-highlight">Yummy Meals!</span>
        </h1>
        
        <p className="hero-description">
          <span className="description-light">Fresh meals from your favorite restaurants</span>
          <span className="description-bold"> Delicious Food, Delivered Fast!</span>
        </p>
        
        <div className="hero-actions">
          <button className="btn-primary">
            Order Now
            <span className="btn-arrow">→</span>
          </button>
          <div className="offer-badge">
            <span className="offer-icon"><MdOutlineDeliveryDining /></span>
            <span className="offer-text">Free delivery on first order</span>
          </div>
        </div>
        
        <div className="trust-badges">
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span className="trust-text">10k+ deliveries</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span className="trust-text">30 min delivery</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span className="trust-text">100% fresh</span>
          </div>
        </div>
      </div>

      {/* Image on the right */}
      <div className="hero-image">
        <img src={FoodLogo} alt="Delicious food" />
      </div>

    </section>
  );
}

export default Hero