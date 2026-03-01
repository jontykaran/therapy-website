import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../common/AnimatedSection'

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-700 via-sage-800 to-sage-900" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blush-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
            Take That First Step
          </h2>
          <p className="text-sage-200 text-lg md:text-xl mb-8 leading-relaxed">
            You can reach out for a free consultation by filling out my contact form,
            and I&apos;ll get back to you shortly.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-warm-500 hover:bg-warm-600 text-white rounded-full font-medium text-lg transition-all hover:shadow-lg hover:shadow-warm-500/25"
            >
              Book a Free Consultation
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
