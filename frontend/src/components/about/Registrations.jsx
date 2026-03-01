import AnimatedSection from '../common/AnimatedSection'

export default function Registrations() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <p className="text-blush-400 font-medium text-sm tracking-widest uppercase mb-3">Professional Standards</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-sage-800 mb-10">
            Professional Registration
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex items-center gap-6 bg-sage-50 rounded-xl p-6 md:p-8 border border-sage-100">
            <div className="shrink-0 w-20 h-20 rounded-lg bg-sage-200 flex items-center justify-center">
              <span className="text-sage-700 font-bold text-lg">BACP</span>
            </div>
            <div>
              <h3 className="font-semibold text-sage-800 text-lg mb-2">
                British Association for Counselling and Psychotherapy
              </h3>
              <p className="text-sage-600 leading-relaxed">
                I am a registered member of the British Association for Counselling and
                Psychotherapy (BACP).
              </p>
              <p className="text-sage-500 text-sm mt-2 font-medium">
                Member ID: 406155
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
