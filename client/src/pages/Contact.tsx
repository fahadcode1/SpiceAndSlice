import React, { useState } from "react";
import "./Pages.css";

interface Values {
  email: string
  phone: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<Values>({ email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="page-container">
      <div className="page-inner">

        <p className="page-eyebrow">Get In Touch</p>
        <h1 className="page-title">We'd Love to Hear From You.</h1>
        <p className="page-subtitle">Questions, feedback, or just a hello — we're here.</p>
        <hr className="page-divider" />

        {sent ? (
          <div className="page-section">
            <p style={{ color: "#F7B41A", fontWeight: 600, fontSize: "1rem" }}>
              ✓ Message received! We'll get back to you shortly.
            </p>
          </div>
        ) : (
          <div className="contact-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 00000 00000"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button className="form-submit" onClick={handleSubmit}>
              Send Message →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}