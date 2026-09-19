import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import './Services.css'

const services = [
  {
    number: '01',
    title: 'Packaging Design',
    description:
      "Bag, pouch, bottle, and can designs that are shelf-ready, durable, and built to catch a farmer's eye at first glance.",
  },
  {
    number: '02',
    title: 'Label & Compliance-Ready Artwork',
    description:
      'Clear, readable labels with proper usage instructions, dosage info, and safety symbols — designed to meet industry labeling standards.',
  },
  {
    number: '03',
    title: 'Brand Identity',
    description:
      'Logo, color palette, typography, and brand guidelines that make your company recognizable across every product line.',
  },
  {
    number: '04',
    title: 'Print-Ready & 3D Mockups',
    description:
      'Production-ready artwork and photorealistic 3D mockups that let you visualize your packaging clearly before it goes to print.',
  },
  {
    number: '05',
    title: 'Website Development',
    description:
      'Modern, responsive websites designed for agriculture brands — combining strong visuals, clear messaging, and a seamless experience across every device.',
  },
]

/* ---------- Single stacked card ---------- */

function ServiceCard({ service, index, total, progress }) {
  const reduceMotion = useReducedMotion()

  // Jitna piche ka card, utna zyada chhota hoga
  const targetScale = reduceMotion ? 1 : 1 - (total - 1 - index) * 0.045
  const targetBrightness = reduceMotion ? 1 : 0.55
  const range = [index / total, 1]

  const scale = useTransform(progress, range, [1, targetScale])
  const brightness = useTransform(progress, range, [1, targetBrightness])
  const filter = useTransform(brightness, (v) => `brightness(${v})`)

  return (
    <div className="service-wrap" style={{ '--i': index }}>
      <motion.article className="service" style={{ scale, filter }}>
        <div className="service__number">{service.number}</div>

        <div className="service__content">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>

        <div className="service__arrow">
          <span>↗</span>
        </div>
      </motion.article>
    </div>
  )
}

/* ---------- Section ---------- */

export default function Services() {
  const listRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="services" id="services">
      <div className="services__container">
        {/* Header */}
        <div className="services__header">
          <motion.div
            className="services__eyebrow"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              style={{ originX: 0 }}
            />
            OUR SERVICES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            What We <em>Design</em> For You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
            Strategic design and premium visuals created specifically
            for modern agriculture brands.
          </motion.p>
        </div>

        {/* Stacked cards */}
        <div className="services__list" ref={listRef}>
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={i}
              total={services.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}