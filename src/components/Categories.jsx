import { useState, useCallback, useEffect, useRef } from 'react'
import './Categories.css'

const CATS = [
  {
    name: 'Fertilizers',
    accent: '#b5e047',
    // img1: fertilizer spreader machine on crop field (James Baltz, Unsplash)
    // img2: close-up white fertilizer granules (Kenneth Berrios Alvarez, Unsplash)
    img1: 'https://ifoda.uz/storage/01KJC5ZZ8FRMEZHZQ6RG62CYST.png',
    img2: 'https://martiran.com/wp-content/uploads/2025/03/03-3.jpg',
    modalImg: 'https://martiran.com/wp-content/uploads/2025/03/03-3.jpg',
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

export default function Categories({ onCategoryClick }) {
  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState(null)

  const handleClick = useCallback((cat) => {
    onCategoryClick?.(cat.name)
    setActive(cat)
  }, [onCategoryClick])

  return (
    <section className="categories" id="categories">
      <Modal cat={active} onClose={() => setActive(null)} />

      <div className="categories__head">
        <p className="categories__eyebrow">Our expertise</p>
        <h2 className="categories__title">What we package</h2>
        <p className="categories__sub">
          Pick a category to explore our approach or start a brief directly.
        </p>
      </div>

      <div className="categories__row">
        {CATS.map((cat, i) => (
          <button
            key={cat.name}
            className={`cat-card${i % 2 === 1 ? ' cat-card--offset' : ''}`}
            style={{ '--ac': cat.accent }}
            onMouseEnter={() => setHovered(cat.name)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(cat)}
            aria-label={`Open ${cat.name} packaging details`}
          >
            <div className="cat-card__imgs">
              <img src={cat.img1} alt={`${cat.name} packaging`} className="cat-card__img cat-card__img--base" loading="lazy" />
              <img src={cat.img2} alt="" aria-hidden="true"
                className={`cat-card__img cat-card__img--hover${hovered === cat.name ? ' is-visible' : ''}`}
                loading="lazy" />
            </div>
            <div className="cat-card__shade" />
            <div className="cat-card__accent-bar" />
            <div className="cat-card__body">
              <span className="cat-card__name">{cat.name}</span>
              <p className={`cat-card__desc${hovered === cat.name ? ' is-visible' : ''}`}>
                {cat.desc.split('.')[0]}.
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}