import { useEffect, useState } from 'react'
import './ContactForm.css'

const CATEGORY_OPTIONS = [
  'Fertilizer',
  'Seed',
  'Pesticide',
  'Other',
]

export default function ContactForm({ selectedCategory, formRef }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    category: '',
    phone: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (selectedCategory) {
      setForm((prev) => ({
        ...prev,
        category: selectedCategory,
      }))
    }
  }, [selectedCategory])

  function validateForm() {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name'
    }

    if (!form.company.trim()) {
      newErrors.company = 'Please enter your company name'
    }

    if (!form.category) {
      newErrors.category = 'Please select a product category'
    }

    const cleanPhone = form.phone.replace(/\D/g, '')

    if (!cleanPhone) {
      newErrors.phone = 'Please enter your phone number'
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    return newErrors
  }

  function handleChange(event) {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  function handleBlur(event) {
    const { name } = event.target

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    setTouched({
      name: true,
      company: true,
      category: true,
      phone: true,
      message: true,
    })

    const newErrors = validateForm()

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    setIsLoading(true)

    window.setTimeout(() => {
      console.log('Form submitted:', form)

      setIsLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  function resetForm() {
    setSubmitted(false)

    setForm({
      name: '',
      company: '',
      category: '',
      phone: '',
      message: '',
    })

    setTouched({})
    setErrors({})
  }

  return (
    <section
      className="contact"
      id="contact"
      ref={formRef}
    >
      <div className="contact__glow contact__glow--one" />
      <div className="contact__glow contact__glow--two" />

      <div className="contact__container">

        {/* LEFT CONTENT */}

        <div className="contact__content">

          <div className="contact__eyebrow">
            <span className="contact__eyebrow-line" />
            FREE DESIGN CONSULTATION
          </div>

          <h2 className="contact__title">
            Let's Design Packaging
            <span> That Performs.</span>
          </h2>

          <p className="contact__description">
            Tell us about your product and we'll get back to you
            with ideas within 24 hours.
          </p>

          <div className="contact__features">

            <div className="contact__feature">
              <div className="contact__feature-icon">
                01
              </div>

              <div>
                <h4>Tell Us Your Product</h4>
                <p>
                  Share your product category and packaging requirements.
                </p>
              </div>
            </div>

            <div className="contact__feature">
              <div className="contact__feature-icon">
                02
              </div>

              <div>
                <h4>We Create Ideas</h4>
                <p>
                  Our team develops a creative design direction.
                </p>
              </div>
            </div>

            <div className="contact__feature">
              <div className="contact__feature-icon">
                03
              </div>

              <div>
                <h4>Let's Build Your Brand</h4>
                <p>
                  Packaging designed to stand out and build trust.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="contact__form-wrapper">

          <div className="contact__form-top">

            <div>
              <span className="contact__form-label">
                START YOUR PROJECT
              </span>

              <h3>
                Tell us about your product
              </h3>
            </div>

          </div>

          <form
            className="contact__form"
            onSubmit={handleSubmit}
          >

            {submitted ? (

              <div className="contact__success">

                <div className="contact__success-icon">
                  ✓
                </div>

                <h3>
                  Thank You!
                </h3>

                <p>
                  Your request has been received. Our team will
                  contact you within 24 hours.
                </p>

                <button
                  type="button"
                  className="contact__again-btn"
                  onClick={resetForm}
                >
                  Send Another Request
                </button>

              </div>

            ) : (

              <>

                {/* NAME + COMPANY */}

                <div className="contact__row">

                  <label className="contact__field">

                    <span>
                      Name
                    </span>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your name"
                      className={
                        errors.name && touched.name
                          ? 'contact__input contact__input--error'
                          : 'contact__input'
                      }
                    />

                    {errors.name && touched.name && (
                      <small>
                        {errors.name}
                      </small>
                    )}

                  </label>

                  <label className="contact__field">

                    <span>
                      Company Name
                    </span>

                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your company"
                      className={
                        errors.company && touched.company
                          ? 'contact__input contact__input--error'
                          : 'contact__input'
                      }
                    />

                    {errors.company && touched.company && (
                      <small>
                        {errors.company}
                      </small>
                    )}

                  </label>

                </div>

                {/* CATEGORY + PHONE */}

                <div className="contact__row">

                  <label className="contact__field">

                    <span>
                      Product Category
                    </span>

                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.category && touched.category
                          ? 'contact__input contact__input--error'
                          : 'contact__input'
                      }
                    >

                      <option value="">
                        Select category
                      </option>

                      {CATEGORY_OPTIONS.map((category) => (

                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>

                      ))}

                    </select>

                    {errors.category && touched.category && (
                      <small>
                        {errors.category}
                      </small>
                    )}

                  </label>

                  <label className="contact__field">

                    <span>
                      Phone Number
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      className={
                        errors.phone && touched.phone
                          ? 'contact__input contact__input--error'
                          : 'contact__input'
                      }
                    />

                    {errors.phone && touched.phone && (
                      <small>
                        {errors.phone}
                      </small>
                    )}

                  </label>

                </div>

                {/* MESSAGE */}

                <label className="contact__field">

                  <div className="contact__message-label">

                    <span>
                      Message
                    </span>

                    <em>
                      Optional
                    </em>

                  </div>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your product or packaging requirements..."
                    rows="4"
                    maxLength="500"
                  />

                  <div className="contact__counter">
                    {form.message.length}/500
                  </div>

                </label>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="contact__submit"
                  disabled={isLoading}
                >

                  {isLoading ? (

                    <>
                      <span className="contact__loader" />
                      Sending Request...
                    </>

                  ) : (

                    <>
                      Request a Free Consultation

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12H19M19 12L13 6M19 12L13 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>

                  )}

                </button>

              </>

            )}

          </form>

        </div>

      </div>
    </section>
  )
}