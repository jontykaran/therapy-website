import AnimatedSection from '../common/AnimatedSection'

export default function WelcomeSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <p className="text-warm-500 font-medium text-sm tracking-widest uppercase mb-3">Welcome</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-sage-800 mb-6 leading-snug">
              Hello, I&apos;m Rashi &mdash; a person-centred psychotherapist.
            </h2>
            <div className="space-y-4 text-sage-600 leading-relaxed">
              <p>
                You deserve to be met with empathy, not evaluation. With warmth, not judgement.
                With real presence &mdash; not a one-size-fits-all approach.
              </p>
              <p>
                Together, we create a space where your voice matters, where your feelings are honoured,
                and where you are supported to grow at your own pace.
              </p>
              <p>
                Over the years, I&apos;ve learned to sit with whatever feels heavy &mdash; not to fix,
                but to understand. That&apos;s the heart of my work.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="bg-sage-50 rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-warm-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-warm-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-800 text-lg mb-1">Empathy, Not Evaluation</h3>
                    <p className="text-sage-600 text-sm">
                      You are met with warmth and genuine understanding, never judgement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-ocean-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-800 text-lg mb-1">Safe & Confidential</h3>
                    <p className="text-sage-600 text-sm">
                      A warm, private environment where you can speak freely without fear.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage-200 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-800 text-lg mb-1">At Your Pace</h3>
                    <p className="text-sage-600 text-sm">
                      You set the pace. You choose what to talk about. There&apos;s no agenda &mdash; only yours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
