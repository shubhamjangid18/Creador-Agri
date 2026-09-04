import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    quote: "Creador Designs redesigned our fertilizer packaging and we saw a noticeable difference in retailer pickup within the first season.",
    client: "Rohan Deshmukh",
    company: "Nutrify Agro",
    role: "Founder & CEO",
    rating: 5,
    initials: "RD",
  },
  {
    quote: "They understood compliance requirements better than agencies twice their size. Our GHS labelling passed export audits on the first try.",
    client: "Ananya Kulkarni",
    company: "AgroShield Protect",
    role: "Head of Regulatory",
    rating: 5,
    initials: "AK",
  },
  {
    quote: "The seed pouch redesign made our germination data and QR traceability feel premium instead of purely functional. Distributors noticed immediately.",
    client: "Vikram Singh",
    company: "GreenSprout Seeds",
    role: "Managing Director",
    rating: 5,
    initials: "VS",
  },
  {
    quote: "Our biostimulant line needed to look scientific and sustainable at once. Creador nailed that balance across cartons and bottles both.",
    client: "Priya Nair",
    company: "FarmVital Biosciences",
    role: "Brand Manager",
    rating: 5,
    initials: "PN",
  },
  {
    quote: "From concept to shelf-ready packs in six weeks. Communication was sharp and revisions were fast — rare for packaging vendors.",
    client: "Arjun Mehta",
    company: "Nutricrop India",
    role: "Operations Lead",
    rating: 5,
    initials: "AM",
  },
  {
    quote: "We rebranded our entire AgTech platform's field-kit packaging with Creador. Retail partners called it the most premium agri packaging they'd seen.",
    client: "Sneha Iyer",
    company: "Acasia Techno",
    role: "Co-Founder",
    rating: 5,
    initials: "SI",
  },
];

const AUTO_MS  = 6000;
const PER_PAGE = 3;

export default function Testimonials() {
  const pages = Math.ceil(TESTIMONIALS.length / PER_PAGE);
  const [page,    setPage]    = useState(0);
  const [dir,     setDir]     = useState(1);
  const [paused,  setPaused]  = useState(false);
  const [progKey, setProgKey] = useState(0);

  const goTo = useCallback((next, d) => {
    setDir(d); setPage(next); setProgKey(k => k + 1);
  }, []);

  const next = useCallback(() => goTo((page + 1) % pages,  1), [page, pages, goTo]);
  const prev = useCallback(() => goTo((page - 1 + pages) % pages, -1), [page, pages, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTO_MS);
    return () => clearTimeout(t);
  }, [page, paused, next]);

  const visible = TESTIMONIALS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section
      className="ts-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ts-bg-glow" aria-hidden="true" />

      <div className="ts-wrap">

        {/* Header */}
        <motion.div
          className="ts-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="ts-eyebrow">
            <span className="ts-eyebrow__line" />
            CLIENT STORIES
            <span className="ts-eyebrow__line" />
          </div>
          <h2 className="ts-title">
            Trusted by <em>Agri Businesses</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="ts-stage">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={page}
              className="ts-grid"
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {visible.map((t, i) => (
                <div className="ts-card" key={i}>

                  <div className="ts-card__stars" aria-label={`${t.rating} stars`}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} width="12" height="12" viewBox="0 0 24 24"
                        fill={si < t.rating ? "currentColor" : "none"}
                        stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M12 3.5l2.7 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.8l-5.5 3 1.1-6.3-4.6-4.4 6.3-.9L12 3.5z"/>
                      </svg>
                    ))}
                  </div>

                  <div className="ts-card__quote-mark" aria-hidden="true">"</div>

                  <p className="ts-card__text">{t.quote}</p>

                  <div className="ts-card__client">
                    <div className="ts-card__avatar">{t.initials}</div>
                    <div className="ts-card__info">
                      <strong>{t.client}</strong>
                      <span>{t.role} · {t.company}</span>
                    </div>
                  </div>

                  <div className="ts-card__bar" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button className="ts-arrow ts-arrow--prev" onClick={prev} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="ts-arrow ts-arrow--next" onClick={next} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="ts-dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              className={`ts-dot${i === page ? " ts-dot--active" : ""}`}
              onClick={() => goTo(i, i > page ? 1 : -1)}
              aria-label={`Page ${i + 1}`}
            >
              {i === page && !paused && (
                <span key={progKey} className="ts-dot__fill"
                  style={{ animationDuration: `${AUTO_MS}ms` }} />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="ts-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <span>BUILT ON RESULTS</span>
          <p>Good design gets noticed. Great design gets remembered.</p>
        </motion.div>

      </div>
    </section>
  );
}