import { useState } from "react";
import "./Footer.css";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.5 10v6.2M7.5 7.6v.02M11.3 16.2V10M11.3 12.6c0-1.5 1-2.6 2.4-2.6 1.5 0 2.3 1 2.3 2.7v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 8.5h2V5.3h-2.3c-2.2 0-3.5 1.4-3.5 3.7v1.7H8v3.2h2.2V21h3.1v-7.1h2.3l.4-3.2h-2.7V9.4c0-.6.3-.9 1-.9z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3500);
  }

  return (
    <footer className="footer">
      <div className="footer__noise" aria-hidden="true" />
      <div className="footer__glow footer__glow--a" aria-hidden="true" />
      <div className="footer__glow footer__glow--b" aria-hidden="true" />

      <div className="footer__container">

        {/* Floating premium CTA banner */}
        <div className="footer__banner">
          <div className="footer__banner-text">
            <span className="footer__banner-eyebrow">Start a project</span>
            <h3>Got packaging on your mind?</h3>
            <p>Tell us about your brand we'll get back within one business day.</p>
          </div>

          <form className="footer__subscribe" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit">
              {submitted ? "Sent ✓" : "Let's talk"}
            </button>
          </form>
        </div>

        {/* Main */}
        <div className="footer__main">

          {/* Brand */}
          <div className="footer__brand-col">
            <div className="footer__brand">
              <img
                src="/products/Creador Fertilizer Packagings/CreadorDesignsLogo.png"
                alt="Creador Designs logo"
                className="footer__logo-img"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>

            <p className="footer__intro">
              Premium branding &amp; packaging solutions
              for modern agriculture businesses.
            </p>

            <div className="footer__socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="footer__social"
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer__column">
            <h4><span className="footer__col-bar" />Explore</h4>

            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#categories">Categories</a>
            <a href="#work">Our Work</a>
          </div>

          {/* Contact */}
          <div className="footer__column">
            <h4><span className="footer__col-bar" />Contact</h4>

            <a href="mailto:hello@creadordesigns.com">
              hello@creadordesigns.com
            </a>

            <a href="tel:+919876543210">
              +91 98765 43210
            </a>

            <span className="footer__location">
              Pune, Maharashtra
            </span>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer__bottom">

          <span>
            © {year} Creador Designs. All rights reserved.
          </span>

          <div className="footer__legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>

          <button
            type="button"
            className="footer__totop"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>

      </div>

    </footer>
  );
}