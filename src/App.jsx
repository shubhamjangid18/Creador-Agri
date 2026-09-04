
import { useRef, useState } from 'react'

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Breather from './components/Breather.jsx'
import Services from './components/Services.jsx'
import Categories from './components/Categories.jsx'
import Marquee from './components/Marquee.jsx'
import LiveSites from './components/LiveSites.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import Process from './components/Process.jsx'
import Testimonials from './components/Testimonials.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const contactRef = useRef(null)

  function scrollToContact(category) {
    if (category) setSelectedCategory(category)

    contactRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <Navbar onContactClick={() => scrollToContact()} />

      <Hero onContactClick={() => scrollToContact()} />

      <Breather />

      {/* Premium Services Section */}
      <Services />

      <Categories onCategoryClick={scrollToContact} />

      <Marquee />

      <LiveSites />

      {/* Why Agri Brands Choose Creador */}
      <WhyChooseUs />

      {/* How We Work */}
      <Process />

      {/* Trusted by Agri Businesses */}
      <Testimonials />

      <ContactForm
        selectedCategory={selectedCategory}
        formRef={contactRef}
      />

      <Footer />
    </>
  )
}
