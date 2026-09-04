import { useEffect, useState } from 'react';
import './Hero.css';

const bgImages = [
  {
    src: 'https://www.infobae.com/resizer/v2/35J6LBEGEVH33N4Q36ONKB3Y5A.jpg?auth=2a4bd1196fe2ccc02e7b50011e91787792d9ab817f4402628d51609085604fec&height=512&quality=85&smart=true&width=1024',
    alt: 'Farmer working in an agricultural field',
  },
  {
    src: 'https://clientes.b3.com.br/documents/20119/277844/GettyImages-200010069-0011095385567.jpeg/f42bd9bc-4a44-71c5-e31d-ae2735c2766d?t=1700711820399&version=1.0',
    alt: 'Green agricultural farmland landscape',
  },

   {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=95&fit=crop',
    alt: 'Premium sunflower farm cinematic view',
  },

  {
    src: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&q=95&fit=crop',
    alt: 'Farmer in agricultural field at sunrise',
  },
];

export default function Hero({ onContactClick }) {
  const [active, setActive] = useState(0);

  // Automatic image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % bgImages.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleContactClick = () => {
    if (typeof onContactClick === 'function') {
      onContactClick();
      return;
    }

    const contactSection = document.getElementById('contact');

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="hero">

      {/* Background Images */}
      <div className="hero__bg" aria-hidden="true">
        {bgImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt=""
            className={
              index === active
                ? 'hero__bg-img is-active'
                : 'hero__bg-img'
            }
          />
        ))}
      </div>

      {/* Overlays */}
      <div className="hero__duotone"></div>
      <div className="hero__overlay"></div>
      <div className="hero__grain"></div>
      <div className="hero__vignette"></div>

      {/* Hero Content */}
      <div className="hero__body">
        <div className="hero__copy">

          <div className="hero__rule"></div>

          <div className="hero__eyebrow">
            Agriculture Packaging & Branding
          </div>

          <h1 className="hero__headline">
            Packaging That Sells
            <span>Before a Word Is Read</span>
          </h1>

          <p className="hero__sub">
            Creador Designs helps fertilizer, seed, and pesticide brands
            build packaging and branding that farmers trust and retailers
            pick first.
          </p>

          <div className="hero__actions">

            <button
              type="button"
              className="btn btn--primary"
              onClick={handleContactClick}
            >
              Get a Free Design Consultation

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* <a
              href="#work"
              className="btn btn--secondary"
            >
              View Our Work
              <span>→</span>
            </a> */}

          </div>

        </div>
      </div>

      {/* Slider Controls */}
      <div className="hero__slidefoot">

        <span className="hero__caption">
          Agriculture • Packaging • Branding
        </span>

        <div className="hero__indicators">

          {bgImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={
                index === active
                  ? 'hero__indicator hero__indicator--active'
                  : 'hero__indicator'
              }
              aria-label={`Show image ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}

        </div>

      </div>

    </header>
  );
}