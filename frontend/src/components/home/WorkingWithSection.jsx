import { motion } from 'framer-motion'
import AnimatedSection from '../common/AnimatedSection'

const shifts = [
  { from: 'stuck', to: 'heard' },
  { from: 'overwhelmed', to: 'held' },
  { from: 'silent', to: 'seen' },
]

export default function WorkingWithSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <AnimatedSection>
          <p className="text-warm-500 font-medium text-sm tracking-widest uppercase mb-6">
            The Journey
          </p>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-14">
          {shifts.map((shift, idx) => (
            <AnimatedSection key={shift.from} delay={idx * 0.15}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-3 bg-sage-50 rounded-xl px-6 py-4 border border-sage-100"
              >
                <span className="text-sage-400 font-medium">From</span>
                <span className="text-sage-800 font-semibold text-lg">{shift.from}</span>
                <svg className="w-5 h-5 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-warm-600 font-semibold text-lg">{shift.to}</span>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <p className="font-serif text-2xl md:text-3xl text-sage-800 font-semibold">
            Welcome &mdash; I&apos;m glad you&apos;re here.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
