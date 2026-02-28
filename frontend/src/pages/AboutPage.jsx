import { motion } from 'framer-motion'
import TherapyApproach from '../components/about/TherapyApproach'
import KeyPrinciples from '../components/about/KeyPrinciples'
import WhatToExpect from '../components/about/WhatToExpect'
import WhoCanBenefit from '../components/about/WhoCanBenefit'
import Registrations from '../components/about/Registrations'
import Qualifications from '../components/about/Qualifications'

export default function AboutPage() {
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
            About Me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sage-200 text-lg"
          >
            Learn about my therapeutic approach and how I can support you
          </motion.p>
        </div>
      </section>

      <TherapyApproach />
      <KeyPrinciples />
      <WhatToExpect />
      <WhoCanBenefit />
      <Registrations />
      <Qualifications />
    </>
  )
}
