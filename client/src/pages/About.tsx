import "./Pages.css";

type Values = {
  id: number
  icon : string,
  title : string,
  desc: string 
}

const values : Values[] = [
  {   
    id:0,
    icon: "🔥",
    title: "Passion for Food",
    desc: "Every dish we serve starts with genuine love for cooking and the people eating it.",
  },
  {
    id:1,
    icon: "🌿",
    title: "Fresh Always",
    desc: "No frozen shortcuts. We source fresh ingredients daily from trusted local suppliers.",
  },
  {
    id:2,
    icon: "🤝",
    title: "Community First",
    desc: "We exist for our neighbourhood. Local roots, local flavours, local pride.",
  },
  {
    id:3,
    icon: "⚡",
    title: "Speed & Care",
    desc: "Fast delivery doesn't mean cutting corners. We move quick without compromising quality.",
  },
];

export default function About() {
  return (
    <div className="page-container">
      <div className="page-inner">

        <p className="page-eyebrow">Our Story</p>
        <h1 className="page-title">We Cook With Purpose.</h1>
        <p className="page-subtitle">Last updated · 2024</p>
        <hr className="page-divider" />

        <div className="page-section">
          <p>
            Spice & Slice started with a simple idea — great food shouldn't be complicated to get.
            We're a small team that believes in honest ingredients, fair prices, and meals that
            actually make your day better.
          </p>
          <p>
            What began as a single kitchen has grown into something we're genuinely proud of.
            Not because of the numbers, but because of the people who come back — and the ones
            who tell their friends.
          </p>
        </div>

        <div className="page-section">
          <h2>What We Stand For</h2>
          <div className="mission-grid">
            {values.map((v) => (
              <div className="mission-card" key={v.id}>
                <div className="mission-card-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}