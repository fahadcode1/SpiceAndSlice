import "./Pages.css";

export default function PrivacyPolicy() {
  return (
    <div className="page-container">
      <div className="page-inner">

        <p className="page-eyebrow">Legal</p>
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-subtitle">Last updated · January 2024</p>
        <hr className="page-divider" />

        <div className="page-section">
          <h2>1. What We Collect</h2>
          <p>
            When you place an order or contact us, we may collect your name, email address,
            phone number, and delivery address. We only collect what's necessary to serve you.
          </p>
        </div>

        <div className="page-section">
          <h2>2. How We Use It</h2>
          <ul>
            <li>To process and deliver your orders.</li>
            <li>To contact you about your order status.</li>
            <li>To improve our service based on feedback.</li>
            <li>We do not sell your data to third parties — ever.</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>3. Cookies</h2>
          <p>
            We use minimal cookies to keep your cart state and preferences saved locally on
            your device. No tracking cookies or third-party ad cookies are used.
          </p>
        </div>

        <div className="page-section">
          <h2>4. Data Storage</h2>
          <p>
            Your data is stored securely and is never shared without your explicit consent.
            You can request deletion of your data at any time by contacting us.
          </p>
        </div>

        <div className="page-section">
          <h2>5. Your Rights</h2>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Opt out of any marketing communications.</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>6. Contact</h2>
          <p>
            For any privacy-related questions, reach us at{" "}
            <span style={{ color: "#F7B41A" }}>privacy@spiceandslice.com</span>
          </p>
        </div>

      </div>
    </div>
  );
}