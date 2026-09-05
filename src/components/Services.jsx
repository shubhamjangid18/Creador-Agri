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

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services__container">

        {/* Header */}
        <div className="services__header">
          <div className="services__eyebrow">
            <span></span>
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

      </div>
    </section>
  )
}