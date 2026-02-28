import { Link } from 'react-router-dom'
import AnimatedSection from '../common/AnimatedSection'
import SectionHeading from '../common/SectionHeading'

const conditions = [
  'Anxiety',
  'Depression',
  'Relationship Problems',
  'Self-Esteem Issues',
  'Personal Growth & Self-Understanding',
]

export default function WhoCanBenefit() {
  return (
    <section className="py-20 md:py-28 bg-sage-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeading
            title="Who Can Benefit?"
            subtitle="Therapy can support anyone — but if you're experiencing any of the following, it may be especially helpful"
          />
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {conditions.map((condition, idx) => (
            <AnimatedSection key={condition} delay={idx * 0.08}>
              <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 border border-sage-100 shadow-sm">
                <svg className="w-5 h-5 text-warm-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sage-700 font-medium">{condition}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="text-center space-y-6">
            <p className="text-sage-600 text-lg leading-relaxed">
              Whether you&apos;re in crisis or simply searching for something more meaningful in life, I&apos;m here.
            </p>
            <p className="text-sage-700 font-medium">
              If any of this resonates with you, don&apos;t hesitate in leaving a message or booking your
              first free 30 minute session.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3.5 bg-sage-600 hover:bg-sage-700 text-white rounded-full font-medium transition-all hover:shadow-lg"
            >
              Book Your Free Session
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
