import WhyUsImg from "../../assets/desktop.png"
import "./WhyUs.css";
export default function WhyUs() {

  type Values = {
  id: number
  icon : string,
  title : string,
  desc: string 
}   
  const reasons : Values[] = [
      {
        id:0,
        icon: "🔥",
        title: "Made Fresh Daily",
        desc: "Every dish is prepared the same day, no reheated leftovers, ever.",
      },
      {
        id:1,
        icon: "⚡",
        title: "30-Minute Delivery",
        desc: "We guarantee your food arrives hot and on time, or your next order is on us.",
      },
      {
        id:2,
        icon: "🌿",
        title: "Quality Ingredients",
        desc: "Sourced from trusted local suppliers. Clean, wholesome, and traceable.",
      },
      {
        id:3,
        icon: "💬",
        title: "Real Support",
        desc: "Humans, not bots. Our team is available 7 days a week to help you.",
      },
    ];
  return (
    <section className="whyus-section">

      {/* LEFT: Text content */}
      <div className="whyus-content">

        <p className="whyus-eyebrow">
          <span className="badge">🏆 WHY CHOOSE US</span>
        </p>

        <h1 className="whyus-title">
          Not Just Food. <br />
          An <span className="title-highlight">Experience.</span>
        </h1>

        <p className="whyus-description">
          <span className="description-light">We obsess over every detail </span>
          <span className="description-bold">so you can just enjoy the meal.</span>
        </p>

        <div className="whyus-reasons">
          {reasons.map((r, i) => (
            <div
              className="reason-card"
              key={i}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="reason-icon">{r.icon}</span>
              <div className="reason-text">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT: Background image slot — drop your image here */}
      <div className="whyus-image">
       <img src={WhyUsImg} alt="whyus"></img>
      </div>

    </section>
  );
}