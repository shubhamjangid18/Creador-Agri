import { useEffect, useState } from 'react'
import './Navbar.css'

export default function Navbar({ onContactClick }) {
  const [scrolled, setScrolled] = useState(false)

  /* =====================================================
     SCROLL BEHAVIOUR (For glass effect on scroll)
  ===================================================== */
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30)
        ticking = false
      })
      ticking = true
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = e => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        
        {/* =================================================
            LEFT SIDE — BIG WHITE CIRCLE LOGO
        ================================================= */}
        <a href="#top" className="nav__logo" onClick={handleLogoClick} aria-label="Creador Designs">
          <img
            src="/products/Creador Fertilizer Packagings/CreadorDesignsLogo.png"
            alt="Creador Designs"
            className="nav__logo-img"
          />
        </a>

        {/* =================================================
            RIGHT SIDE — PREMIUM ACTION PILL (Phone + CTA)
        ================================================= */}
        <div className="nav__action-pill">
          
          {/* Phone (Gold text & Icon) */}
          <a href="tel:+919876543210" className="nav__phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.31.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.16 21 3 13.84 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.19 2.46.56 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z" fill="currentColor"/>
            </svg>
            <span className="nav__phone-text">+91 9325026968</span>
          </a>

          <div className="nav__divider" />

          {/* CTA (Gold Pill Button) */}
          <button
            className="nav__cta"
            onClick={() => {
              if (typeof onContactClick === 'function') onContactClick()
            }}
          >
            <span>Contact Now</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
      </div>
    </nav>
  )
}