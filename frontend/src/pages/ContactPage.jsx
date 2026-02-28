import { motion } from 'framer-motion'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import AnimatedSection from '../components/common/AnimatedSection'

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-sage-700 to-sage-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sage-200 text-lg"
          >
            Ready to take the first step? I&apos;d love to hear from you
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <ContactForm />
              </AnimatedSection>
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
