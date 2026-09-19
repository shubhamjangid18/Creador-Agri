import { useState, useCallback, useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import './Categories.css'

const CATS = [
  {
    name: 'Fertilizers',
    accent: '#b5e047',
    // img1: fertilizer spreader machine on crop field (James Baltz, Unsplash)
    // img2: close-up white fertilizer granules (Kenneth Berrios Alvarez, Unsplash)
    img1: 'https://ifoda.uz/storage/01KJC5ZZ8FRMEZHZQ6RG62CYST.png',
    img2: 'https://unsplash.com/photos/RZMlzrsjFU4/download?w=800',
    modalImg: 'https://unsplash.com/photos/RZMlzrsjFU4',
    desc: 'Industrial sacks, FIBC jumbo bags and retail pouches built for weight tolerance, moisture barrier performance, and shelf impact on crowded agrodealer shelves.',
    bullets: [
      '50 kg woven PP sacks with UV-stabilised print',
      'Jumbo FIBC bulk bags with food-grade liners',
      'Retail 1–5 kg stand-up pouches with hang holes',
      'GHS & statutory compliance label integration',
    ],
  },
  {
    name: 'Seeds',
    accent: '#7ecb6f',
    // img1: green shovel with soil — seed sowing context (Neslihan Gunaydin, Unsplash)
    // img2: woman holding soil/compost in hands — seed planting (EqualStock, Unsplash)
    img1: 'https://www.campojalon.es/wp-content/uploads/2022/05/blog1.jpg',
    img2: 'https://image.made-in-china.com/2f0j00LQMougnylSbO/Electric-Grain-Seeds-Impurities-Vibrating-Screen-Machine.webp',
    modalImg: 'https://www.campojalon.es/wp-content/uploads/2022/05/blog1.jpg',
    desc: 'Foil-sealed seed pouches and sachets with varietal-specific design systems packaged to communicate purity, germination rate, and brand trust at a glance.',
    bullets: [
      'Foil & kraft laminate pouches in 50 g – 5 kg',
      'Varietal colour-code systems across crops',
      'QR-linked germination & traceability data',
      'Child-resistant & tamper-evident closures',
    ],
  },
  {
    name: 'Pesticides',
    accent: '#f5c842',
    // img1: tractor spraying field — fertilizer/pesticide application (James Baltz, Unsplash)
    // img2: fertilizer spreader on corn field — field chemical application (James Baltz, Unsplash)
    img1: 'https://images.pexels.com/photos/29282018/pexels-photo-29282018.jpeg',
    img2: 'https://images.pexels.com/photos/14944259/pexels-photo-14944259.jpeg',
    modalImg: 'https://images.pexels.com/photos/14944259/pexels-photo-14944259.jpeg',
    desc: 'HDPE bottles, jerry-cans and trigger-spray assemblies with hazard-compliant label systems engineered to survive field conditions while meeting all GHS pictogram requirements.',
    bullets: [
      '100 ml – 20 L HDPE & PET bottle forms',
      'GHS Hazard pictogram & signal word layouts',
      'Child-resistant caps and anti-tamper seals',
      'Multilingual label systems for export markets',
    ],
  },
  {
    name: 'Biostimulants',
    accent: '#5bbf8e',
    // img1: green grass field lush growth — biostimulant result (Ben Wicks, Unsplash)
    // img2: gardening gloves working in soil — organic plant care (Hasan Hasanzadeh, Unsplash)
    img1: 'https://static.wixstatic.com/media/f25be8_0fd4a3476c02487e8d95ad60adf6a653~mv2.png/v1/fill/w_500,h_500,al_c,q_85,enc_avif,quality_auto/6.png',
    img2: 'https://www.hechenbichler.com/img/containers/assets/news/2025_06_landwirt_biostimulanzien_als_nat%C3%BCrliche_helfer/2025-06-News-Landwirt_Biostimulanzien-als-naturliche-Helfer_Wurzelbiomasse.png/4682de8450b3c00dd4e9be381ccc5cb8.png',
    modalImg: 'https://www.hechenbichler.com/img/containers/assets/news/2025_06_landwirt_biostimulanzien_als_nat%C3%BCrliche_helfer/2025-06-News-Landwirt_Biostimulanzien-als-naturliche-Helfer_Wurzelbiomasse.png/4682de8450b3c00dd4e9be381ccc5cb8.png',
    desc: 'Premium carton and bottle packaging that signals science and sustainability for the fast-growing bio-input market designed to earn shelf space in modern agri-retail.',
    bullets: [
      'Premium folding carton with soft-touch laminate',
      'Amber glass & HDPE bottles for liquid formats',
      'Carbon footprint & organic-certified iconography',
      'Clean-label ingredient panel design systems',
    ],
  },
  {
    name: 'Fungicides',
    accent: '#e07b54',
    // img1: diseased/fallen leaf on ground — fungal decay visible (Sean Foster, Unsplash)
    // img2: brown tractor on grass — field treatment scene (Etienne Girardet, Unsplash)
    img1: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mango_powdery_mildew_severe_leaf_blight_with_mycelium_1.jpg',
    img2: 'https://commons.wikimedia.org/wiki/Special:FilePath/Powdery_Mildew_in_Soyabean_leaves.jpg',
    modalImg: 'https://commons.wikimedia.org/wiki/Special:FilePath/Powdery_Mildew_in_Soyabean_leaves.jpg',
    desc: 'Tin cans and WDG sachet packs with structured label hierarchies that survive field handling, pass regulatory scrutiny, and build brand recall across crop-protection portfolios.',
    bullets: [
      '300 g – 1 kg tin cans with full wrap labels',
      'WDG water-dispersible granule sachet format',
      'Structured label hierarchy for multi-active products',
      'Crop-specific colour-band identification systems',
    ],
  },
]

const EASE = [0.22, 1, 0.36, 1]

/* ---------- Modal ---------- */

function Modal({ cat, onClose }) {
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!cat) return
    closeBtnRef.current?.focus()

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [cat, onClose])

  if (!cat) return null

  return (
    <div
      className="cat-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="cat-modal" style={{ '--mac': cat.accent }}>
        <button
          ref={closeBtnRef}
          className="cat-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="cat-modal__media">
          <img src={cat.modalImg} alt={cat.name} className="cat-modal__img" />
          <div className="cat-modal__media-fade" aria-hidden="true" />
          <span className="cat-modal__badge">{cat.name}</span>
        </div>

        <div className="cat-modal__body">
          <h3 className="cat-modal__name" id="modal-title">{cat.name}</h3>
          <p className="cat-modal__text">{cat.desc}</p>
          <ul className="cat-modal__list">
            {cat.bullets.map(b => <li key={b}>{b}</li>)}
          </ul>
          <div className="cat-modal__footer">
            <button className="btn-primary" onClick={onClose}>Start a brief</button>
            <button className="btn-ghost" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Single card (tilt + cursor spotlight) ---------- */

function CatCard({ cat, index, wide, onOpen, reduceMotion }) {
  const ref = useRef(null)
  const [hover, setHover] = useState(false)

  // cursor position inside card
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // tilt
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const rotateX = useSpring(rotX, { stiffness: 160, damping: 18, mass: 0.4 })
  const rotateY = useSpring(rotY, { stiffness: 160, damping: 18, mass: 0.4 })

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, color-mix(in srgb, var(--ac) 26%, transparent), transparent 70%)`

  function handleMove(e) {
    if (reduceMotion || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = e.clientX - r.left
    const py = e.clientY - r.top
    mx.set(px)
    my.set(py)
    rotY.set((px / r.width - 0.5) * 8)
    rotX.set(-(py / r.height - 0.5) * 8)
  }

  function handleEnter() {
    setHover(true)
  }

  function handleLeave() {
    setHover(false)
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={`cat-card${wide ? ' cat-card--wide' : ''}${hover ? ' is-hover' : ''}`}
      style={{
        '--ac': cat.accent,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onClick={() => onOpen(cat)}
      aria-label={`Open ${cat.name} packaging details`}
      initial={reduceMotion ? false : { opacity: 0, y: 70 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, delay: index * 0.1, ease: EASE },
      }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -6, transition: { type: 'spring', stiffness: 300, damping: 24 } }
      }
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="cat-card__imgs">
        <img
          src={cat.img1}
          alt={`${cat.name} packaging`}
          className="cat-card__img cat-card__img--base"
          loading="lazy"
        />
        <img
          src={cat.img2}
          alt=""
          aria-hidden="true"
          className="cat-card__img cat-card__img--hover"
          loading="lazy"
        />
      </div>

      <div className="cat-card__shade" />
      <motion.div className="cat-card__spot" style={{ background: spotlight }} />

      <div className="cat-card__top">
        <span className="cat-card__index">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="cat-card__arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="cat-card__body">
        <span className="cat-card__line" />
        <span className="cat-card__name">{cat.name}</span>
        <p className="cat-card__desc">{cat.desc.split('.')[0]}.</p>
        <span className="cat-card__cta">
          Explore
          <i />
        </span>
      </div>
    </motion.button>
  )
}

/* ---------- Section ---------- */

export default function Categories({ onCategoryClick }) {
  const [active, setActive] = useState(null)
  const reduceMotion = useReducedMotion()

  const handleClick = useCallback((cat) => {
    onCategoryClick?.(cat.name)
    setActive(cat)
  }, [onCategoryClick])

  return (
    <section className="categories" id="categories">
      <Modal cat={active} onClose={() => setActive(null)} />

      <div className="categories__bg" aria-hidden="true" />

      <div className="categories__inner">
        <motion.div
          className="categories__head"
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="categories__head-left">
            <p className="categories__eyebrow">Our expertise</p>
            <h2 className="categories__title">
              What we <em>designs</em>
            </h2>
          </div>

          <div className="categories__head-right">
            <p className="categories__sub">
              Pick a category to explore our approach or start a brief directly.
            </p>
            <span className="categories__count">
              {String(CATS.length).padStart(2, '0')} Categories
            </span>
          </div>
        </motion.div>

        <div className="categories__grid">
          {CATS.map((cat, i) => (
            <CatCard
              key={cat.name}
              cat={cat}
              index={i}
              wide={i < 2}
              onOpen={handleClick}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}