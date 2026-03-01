import { motion } from 'framer-motion'
import AnimatedSection from '../common/AnimatedSection'
import SectionHeading from '../common/SectionHeading'

const principles = [
  {
    title: 'Unconditional Positive Regard',
    description: 'I accept you as you are, without judgement. You don\'t need to earn my respect or approval \u2014 it\'s already yours.',
    color: 'bg-ocean-50 border-ocean-200',
    iconColor: 'bg-ocean-100 text-ocean-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Empathy',
    description: 'I aim to understand your experience from the inside \u2014 not just what you\'re saying, but what it feels like to be you.',
    color: 'bg-blush-50 border-blush-200',
    iconColor: 'bg-blush-100 text-blush-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Congruence',
    description: 'I\'m real with you. I don\'t hide behind a professional mask. You\'ll always know where you stand with me.',
    color: 'bg-sage-50 border-sage-200',
    iconColor: 'bg-sage-200 text-sage-700',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function KeyPrinciples() {
  return (
    <section className="py-20 md:py-28 bg-sage-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeading
            title="Core Principles"
            subtitle="The three conditions at the heart of person-centred therapy"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, idx) => (
            <AnimatedSection key={p.title} delay={idx * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`rounded-xl p-6 border ${p.color} h-full`}
              >
                <div className={`w-14 h-14 rounded-lg ${p.iconColor} flex items-center justify-center mb-4`}>
                  {p.icon}
                </div>
                <h3 className="font-semibold text-sage-800 text-lg mb-3">{p.title}</h3>
                <p className="text-sage-600 text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
