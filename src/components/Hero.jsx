import { useEffect, useState } from 'react';
import './Hero.css';

const bgImages = [
  { src: '/images/firstimg.png',  alt: 'Farmer working in an agricultural field' },
  { src: '/images/secondimg.png', alt: 'Green agricultural farmland landscape' },
  { src: '/images/thirdimg.png',  alt: 'Premium green agriculture field' },
];

export default function Hero({ onContactClick }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActive((previous) => (previous + 1) % bgImages.length);
    }, 4000);
    return () => window.clearInterval(intervalId);
  }, []);

  const handleContactClick = () => {
    if (typeof onContactClick === 'function') {
      onContactClick();
      return;
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="hero">
      {/* BACKGROUND IMAGES */}
      <div className="hero__bg" aria-hidden="true">
        {bgImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt=""
            className={index === active ? 'hero__bg-img is-active' : 'hero__bg-img'}
            loading={index === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              console.error(`Image failed to load: ${image.src}`);
              e.target.style.display = 'none';
            }}
          />
        ))}
      </div>

      {/* Premium Overlays */}
      <div className="hero__duotone" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__grain"   aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />

      {/* Hero Content */}
      <div className="hero__body">
        <div className="hero__copy">
          <div className="hero__rule" />

          <div className="hero__eyebrow">
            Agriculture Packaging &amp; Branding
          </div>

          <h1 className="hero__headline">
            <span className="hero__headline-line1">Specialized in Agriculture</span>
            <span className="hero__headline-line2">Packaging Designs</span>
          </h1>

          <p className="hero__sub">
            Creador Designs helps fertilizer, seed, and pesticide brands
            build packaging and branding that farmers trust and retailers
            pick first.
          </p>

          <div className="hero__actions">
            <button
              type="button"
              className="hero__primary-btn"
              onClick={handleContactClick}
            >
              <span>Get a Free Design Consultation</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* SLIDER CONTROLS */}
      <div className="hero__slidefoot">
        <span className="hero__caption">Agriculture • Packaging • Branding</span>
        <div className="hero__indicators">
          {bgImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={index === active ? 'hero__indicator hero__indicator--active' : 'hero__indicator'}
              aria-label={`Show image ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}