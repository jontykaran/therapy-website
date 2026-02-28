import { motion } from 'framer-motion'
import AnimatedSection from '../common/AnimatedSection'

export default function ApproachSection() {
  return (
    <section className="py-20 md:py-28 bg-sage-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-sage-800 mb-6 leading-snug">
              In this space, you are not a diagnosis.
            </h2>
            <p className="text-sage-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              You are not a problem to be solved. You are a whole person &mdash; and I trust your capacity to find your way.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-sage-100">
            <p className="text-sage-600 leading-relaxed mb-6">
              My work is grounded in the <strong className="text-sage-800">person-centred approach</strong>,
              developed by Carl Rogers &mdash; a way of being that honours who you are, right now.
            </p>

            <div className="border-l-4 border-warm-300 pl-6 py-2">
              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-sage-700 text-lg"
                >
                  You don&apos;t need to understand theory to benefit from therapy.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="text-sage-700 text-lg"
                >
                  You don&apos;t need to have &lsquo;the right words&rsquo;.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-sage-700 text-lg"
                >
                  You don&apos;t even need to know what&apos;s wrong.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
                  className="text-sage-800 text-lg font-semibold"
                >
                  You only need to show up &mdash; exactly as you are.
                </motion.p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
