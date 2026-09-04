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
    title: '3D Mockups & Print-Ready Files',
    description:
      'Photorealistic mockups to preview your packaging before printing, plus print-ready files your manufacturer can use directly.',
  },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services__container">

        {/* Header */}
        <div className="services__header">
          <div className="services__eyebrow">
            <span />
            OUR SERVICES
          </div>

          <h2>
            What We <em>Design</em> For You
          </h2>

          <p>
            Strategic design and premium visuals created specifically
            for modern agriculture brands.
          </p>
        </div>

        {/* Services */}
        <div className="services__list">
          {services.map((service) => (
            <article
              className="service"
              key={service.number}
            >
              <div className="service__number">
                {service.number}
              </div>

              <div className="service__content">
                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>

              <div className="service__arrow">
                <span>↗</span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom */}
        <div className="services__bottom">
          <span>DESIGNING FOR AGRICULTURE</span>

          <div className="services__line" />

          <span>01 — 04</span>
        </div>

      </div>
    </section>
  )
}