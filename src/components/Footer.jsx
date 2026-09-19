import { useState } from "react";
import "./Footer.css";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.5 10v6.2M7.5 7.6v.02M11.3 16.2V10M11.3 12.6c0-1.5 1-2.6 2.4-2.6 1.5 0 2.3 1 2.3 2.7v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 8.5h2V5.3h-2.3c-2.2 0-3.5 1.4-3.5 3.7v1.7H8v3.2h2.2V21h3.1v-7.1h2.3l.4-3.2h-2.7V9.4c0-.6.3-.9 1-.9z" fill="currentColor" />
      </svg>
    ),
  },
];

const COLUMNS = [
  {
    title: "Explore",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3c-4.5 3-7 6.8-7 10.5A7 7 0 0 0 12 21a7 7 0 0 0 7-7.5C19 9.8 16.5 6 12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
    links: [
      { label: "Home", href: "#home" },
      { label: "Services", href: "#services" },
      { label: "Categories", href: "#categories" },
      { label: "Our Work", href: "#work" },
    ],
  },
  {
    title: "Industries",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M3.5 7 12 11.5 20.5 7M12 11.5V21.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
    links: [
      { label: "Fertilizers", href: "#fertilizers" },
      { label: "Pesticides", href: "#pesticides" },
      { label: "Seeds", href: "#seeds" },
      { label: "Agri Solutions", href: "#agri-solutions" },
    ],
  },
  {
    title: "Company",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2.7 14.5 9l6.8.5-5.2 4.4 1.7 6.6L12 17l-5.8 3.5 1.7-6.6L2.7 9.5 9.5 9 12 2.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    links: [
      { label: "About Us", href: "#about" },
      { label: "Why Us", href: "#why-us" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
    ],
  },
];

const CONTACTS = [
  {
    label: "hello@creadordesigns.com",
    href: "mailto:hello@creadordesigns.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.7" y="5" width="18.6" height="14" rx="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "+91 98765 43210",
    href: "tel:+919876543210",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.6 3.5 9.4 6.3c.5.5.5 1.3 0 1.8L7.7 9.8a13.3 13.3 0 0 0 6.5 6.5l1.7-1.7c.5-.5 1.3-.5 1.8 0l2.8 2.8c.5.5.5 1.3 0 1.8l-1.4 1.4c-.9.9-2.3 1.3-3.5.9-4.3-1.4-8.9-6-10.3-10.3-.4-1.2 0-2.6.9-3.5L6.6 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Pune, Maharashtra, India",
    href: "#location",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 21.5s7-6.3 7-11.7A7 7 0 0 0 5 9.8c0 5.4 7 11.7 7 11.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="9.8" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
];

const BADGES = [
  { label: "100% Original Designs" },
  { label: "Sustainable Approach" },
  { label: "On-time Delivery" },
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
      <div className="footer__sheen" aria-hidden="true" />

      <div className="footer__container">

        {/* Floating premium glossy CTA banner */}
        <div className="footer__banner">
          <div className="footer__banner-shine" aria-hidden="true" />
          <div className="footer__banner-text">
            <span className="footer__banner-eyebrow">Start a project</span>
            <h3>Got packaging on your mind?</h3>
            <p>Tell us about your brand, we'll get back within one business day.</p>
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
            <button type="submit" className="footer__cta-btn">
              <span>{submitted ? "Sent ✓" : "Let's talk"}</span>
            </button>
          </form>
        </div>

        {/* Divider with leaf emblem */}
        <div className="footer__divider">
          <span className="footer__divider-line" />
          <span className="footer__divider-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3c-4.5 3-7 6.8-7 10.5A7 7 0 0 0 12 21a7 7 0 0 0 7-7.5C19 9.8 16.5 6 12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="footer__divider-line" />
        </div>

        {/* Main */}
        <div className="footer__main">

          {/* Brand */}
          <div className="footer__brand-col">
            <div className="footer__brand">
              <div className="footer__logo-badge">
                <img
                  src="/products/Creador Fertilizer Packagings/CreadorDesignsLogo.png"
                  alt="Creador Designs logo"
                  className="footer__logo-img"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
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

          {/* Navigation columns */}
          {COLUMNS.map((col) => (
            <div className="footer__column" key={col.title}>
              <h4><span className="footer__col-icon">{col.icon}</span>{col.title}</h4>
              {col.links.map((l) => (
                <a href={l.href} key={l.label}>{l.label}</a>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div className="footer__column footer__column--contact">
            <h4>
              <span className="footer__col-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 4.5 11 2l1.4 3.9-2 1.7a11.6 11.6 0 0 0 5.9 5.9l1.7-2L22 12.9 19.5 21c-4.3.2-8.5-1.7-11.5-4.6C5 13.4 3.1 9.1 3 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </span>
              Contact
            </h4>
            {CONTACTS.map((c) => (
              <a href={c.href} key={c.label} className="footer__contact-link">
                <span className="footer__contact-icon">{c.icon}</span>
                {c.label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom */}
        <div className="footer__bottom">

          <span className="footer__copyright">
            © {year} Creador Designs. All rights reserved.
          </span>

          <div className="footer__badges">
            {BADGES.map((b) => (
              <span className="footer__badge" key={b.label}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m8 12.3 2.6 2.6 5.4-5.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b.label}
              </span>
            ))}
          </div>

          <div className="footer__legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms &amp; Conditions</a>
          </div>

        </div>

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
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

    </footer>
  );
}