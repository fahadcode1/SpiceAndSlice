import "./Pages.css";

export default function TermsOfService() {
  return (
    <div className="page-container">
      <div className="page-inner">

        <p className="page-eyebrow">Legal</p>
        <h1 className="page-title">Terms of Service</h1>
        <p className="page-subtitle">Last updated · January 2024</p>
        <hr className="page-divider" />

        <div className="page-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using Spice & Slice, you agree to these terms. If you don't agree,
            please don't use the service. We reserve the right to update these terms
            at any time with notice posted on this page.
          </p>
        </div>

        <div className="page-section">
          <h2>2. Orders & Payments</h2>
          <ul>
            <li>All orders are subject to availability and confirmation.</li>
            <li>Prices displayed are inclusive of applicable taxes.</li>
            <li>Payment must be completed before an order is processed.</li>
            <li>We reserve the right to cancel orders due to pricing errors or stock issues.</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>3. Delivery</h2>
          <p>
            Delivery times are estimates and may vary based on location, weather, or demand.
            We are not liable for delays caused by factors outside our control.
          </p>
        </div>

        <div className="page-section">
          <h2>4. Refunds & Cancellations</h2>
          <ul>
            <li>Orders can be cancelled within 5 minutes of placement.</li>
            <li>Refunds for damaged or incorrect orders are processed within 3–5 business days.</li>
            <li>No refunds once food has been prepared and dispatched.</li>
          </ul>
        </div>

        <div className="page-section">
          <h2>5. User Conduct</h2>
          <p>
            You agree not to misuse the platform, submit fraudulent orders, or engage in
            any conduct that disrupts our service or harms other users.
          </p>
        </div>

        <div className="page-section">
          <h2>6. Limitation of Liability</h2>
          <p>
            Spice & Slice is not liable for indirect or consequential damages arising
            from use of the service. Our maximum liability is limited to the value of
            your most recent order.
          </p>
        </div>

        <div className="page-section">
          <h2>7. Contact</h2>
          <p>
            Questions about these terms? Reach us at{" "}
            <span style={{ color: "#F7B41A" }}>legal@spiceandslice.com</span>
          </p>
        </div>

      </div>
    </div>
  );
}