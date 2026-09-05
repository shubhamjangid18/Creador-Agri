import { motion } from "framer-motion";
import "./Process.css";

const STEPS = [
  {
    number: "01",
    title: "Brief",
    text: "We understand your product, market, audience and business goals.",
  },
  {
    number: "02",
    title: "Design",
    text: "We develop strong concepts built around your brand and category.",
  },
  {
    number: "03",
    title: "Refine",
    text: "We polish every detail with your feedback until it feels right.",
  },
  {
    number: "04",
    title: "Deliver",
    text: "You receive refined, production-ready artwork prepared for print.",
  },
];

export default function Process() {
  return (
    <section className="process-section">
      <div className="process-glow process-glow--one"></div>
      <div className="process-glow process-glow--two"></div>

      <div className="process-container">

        {/* HEADER */}
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="process-label">
            <span></span>
            OUR PROCESS
          </div>

          <div className="process-heading">
            <h2>
              From Idea
              <br />
              <em>to Impact.</em>
            </h2>

            <p>
              A focused creative process that turns your
              product idea into packaging people notice,
              understand and remember.
            </p>
          </div>
        </motion.div>

        {/* STEPS */}
        <div className="process-grid">
          {STEPS.map((step, index) => (
            <motion.article
              className="process-card"
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <div className="process-card-top">
                <span className="process-number">
                  {step.number}
                </span>

                <span className="process-card-arrow">
                  ↗
                </span>
              </div>

              <div className="process-card-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>

              {index < STEPS.length - 1 && (
                <div className="process-connector">
                  <span></span>
                </div>
              )}
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}