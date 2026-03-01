import AnimatedSection from '../common/AnimatedSection'

const contactDetails = [
  {
    label: 'Email',
    value: 'Rashisharmapsychotherapy@outlook.com',
    href: 'mailto:Rashisharmapsychotherapy@outlook.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Sessions',
    value: 'Online & In-Person',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Availability',
    value: 'Monday - Friday, Flexible Hours',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function ContactInfo() {
  return (
    <AnimatedSection delay={0.2}>
      <div className="bg-sage-50 rounded-xl p-6 md:p-8">
        <h3 className="font-serif text-xl font-semibold text-sage-800 mb-6">Contact Information</h3>
        <div className="space-y-5">
          {contactDetails.map((detail) => (
            <div key={detail.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-sage-200 text-sage-600 flex items-center justify-center shrink-0">
                {detail.icon}
              </div>
              <div>
                <p className="text-sage-500 text-sm">{detail.label}</p>
                {detail.href ? (
                  <a href={detail.href} className="text-sage-800 font-medium hover:text-blush-500 transition-colors">
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-sage-800 font-medium">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-sage-200">
          <h4 className="font-semibold text-sage-800 mb-2">Free Initial Consultation</h4>
          <p className="text-sage-600 text-sm leading-relaxed">
            I offer a free 15-minute introductory call so we can discuss
            your needs and see if we&apos;re a good fit. No pressure, no obligation.
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}
