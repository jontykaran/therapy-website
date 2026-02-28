import AnimatedSection from '../common/AnimatedSection'

export default function TherapyApproach() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <p className="text-warm-500 font-medium text-sm tracking-widest uppercase mb-3">My Approach</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-sage-800 mb-8">
            Person-Centred Therapy
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="prose prose-sage max-w-none space-y-5 text-sage-600 leading-relaxed">
            <p className="text-lg text-sage-700 font-medium">
              My approach is rooted in trust, warmth, and genuine human connection.
            </p>
            <p>
              I believe that you are the expert on your own life. My role isn&apos;t to tell you
              what to do &mdash; it&apos;s to walk alongside you, offering a space where you can
              explore what matters most to you, at your own pace.
            </p>
            <p>
              This is therapy without pressure, without judgement &mdash; just real, meaningful support.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-12 bg-sage-50 rounded-2xl p-8 md:p-10 border border-sage-100">
            <h3 className="font-serif text-2xl font-semibold text-sage-800 mb-6">
              What is Person-Centred Therapy?
            </h3>
            <div className="space-y-4 text-sage-600 leading-relaxed">
              <p>
                Person-centred therapy was developed by Carl Rogers, one of the most
                influential psychologists of the 20th century. It&apos;s based on a simple but
                powerful belief: that every person has the inner resources to grow, heal,
                and live more fully &mdash; given the right conditions.
              </p>
              <p>
                In person-centred therapy, you lead the conversation. I don&apos;t use techniques
                or prescribe homework. Instead, I offer a relationship built on three core principles:
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
