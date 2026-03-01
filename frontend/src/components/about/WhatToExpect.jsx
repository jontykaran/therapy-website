import AnimatedSection from '../common/AnimatedSection'

const expectations = [
  {
    number: '01',
    title: 'A Safe and Confidential Space',
    description: 'A warm, private environment (online or in person) where you can speak freely without fear of judgement.',
  },
  {
    number: '02',
    title: 'Support and Accompaniment',
    description: 'I won\'t tell you what to do. Instead, I\'ll be alongside you as you explore your thoughts and emotions.',
  },
  {
    number: '03',
    title: 'Client-Led Sessions',
    description: 'You set the pace. You choose what to talk about. There\'s no agenda \u2014 only yours.',
  },
]

export default function WhatToExpect() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <p className="text-blush-400 font-medium text-sm tracking-widest uppercase mb-3">The Process</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-sage-800 mb-12">
            What to Expect from Me
          </h2>
        </AnimatedSection>

        <div className="space-y-8">
          {expectations.map((item, idx) => (
            <AnimatedSection key={item.number} delay={idx * 0.1}>
              <div className="flex gap-6 items-start">
                <div className="shrink-0 w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center">
                  <span className="text-sage-500 font-semibold text-sm">{item.number}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sage-800 text-lg mb-1">{item.title}</h3>
                  <p className="text-sage-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
