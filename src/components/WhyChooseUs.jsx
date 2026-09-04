import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  ShieldCheck,
  Sprout,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import "./WhyChooseUs.css";

const FEATURES = [
  {
    icon: Target,
    number: "01",
    title: "Industry-Specific Expertise",
    description:
      "Deep understanding of fertilizer, seed, and pesticide categories. Designs built for agri-input products.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Compliance-Aware Design",
    description:
      "GHS, regulatory, and statutory requirements considered from the start. Beautiful and audit-ready.",
  },
  {
    icon: Sprout,
    number: "03",
    title: "Farmer-First Thinking",
    description:
      "Clear, practical designs made to communicate instantly in real-world rural retail environments.",
  },
  {
    icon: Zap,
    number: "04",
    title: "Fast Turnaround",
    description:
      "From brief to print-ready files, we move quickly to match your production timelines.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="why-choose-section">
      <div className="why-container">

        {/* Header */}
        <motion.div
          className="why-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <span className="why-label">WHY CREADOR</span>

          <h2>
            Why Agri Brands <span>Trust Us</span>
          </h2>

          <p>
            Agricultural understanding meets thoughtful design to create
            packaging that works in the real world.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="why-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                className="why-card"
                variants={cardVariants}
              >
                <div className="why-card-top">
                  <div className="why-card-icon">
                    <Icon size={22} strokeWidth={1.7} />
                  </div>

                  <span className="why-card-number">
                    {feature.number}
                  </span>
                </div>

                <div className="why-card-content">
                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>

                <div className="why-card-bottom">
                  <span>CREADOR DESIGNS</span>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="why-card-line" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="why-footer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="why-footer-left">
            <span className="why-footer-dot" />
            <span>DESIGNED FOR THE FIELD</span>
          </div>

          <p>
            Built for the <strong>brand.</strong>
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;