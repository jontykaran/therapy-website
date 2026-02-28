import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/images/hero-nature.jpg)',
        }}
      />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-900/60 via-sage-800/50 to-sage-900/70" />

      {/* Floating particles / ambient animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: 10 + Math.random() * 20,
              height: 10 + Math.random() * 20,
              left: `${15 + i * 15}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-warm-200 text-sm md:text-base tracking-widest uppercase mb-4">
            Person-Centred Psychotherapy
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6"
        >
          You already hold the{' '}
          <span className="italic text-warm-200">answers</span>.{' '}
          Sometimes, you just need the right space to find them.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-sage-100 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          If you&apos;re ready to gently turn towards yourself, you&apos;re in the right place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-warm-500 hover:bg-warm-600 text-white rounded-full font-medium transition-all hover:shadow-lg hover:shadow-warm-500/25 text-lg"
          >
            Book a Free Consultation
          </Link>
          <Link
            to="/about"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-full font-medium transition-all text-lg"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
