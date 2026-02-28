import AnimatedSection from '../common/AnimatedSection'

const qualifications = [
  {
    degree: 'Masters in Person-Centred Therapy',
    institution: 'University of Nottingham',
  },
  {
    degree: 'Bachelor\u2019s in Psychology',
    institution: 'India',
  },
]

export default function Qualifications() {
  return (
    <section className="py-20 md:py-28 bg-sage-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <p className="text-warm-500 font-medium text-sm tracking-widest uppercase mb-3">Education & Training</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-sage-800 mb-10">
            Qualifications
          </h2>
        </AnimatedSection>

        <div className="space-y-4 mb-8">
          {qualifications.map((qual, idx) => (
            <AnimatedSection key={qual.degree} delay={idx * 0.1}>
              <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-sage-100">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-warm-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-warm-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sage-800 text-lg">{qual.degree}</h3>
                  <p className="text-sage-500">{qual.institution}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.2}>
          <p className="text-sage-600 leading-relaxed">
            My training is grounded in the person-centred tradition, with a deep commitment
            to ongoing professional development and reflective practice.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
