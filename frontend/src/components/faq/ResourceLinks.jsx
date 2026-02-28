import AnimatedSection from '../common/AnimatedSection'
import { resources } from './faqData'

export default function ResourceLinks() {
  return (
    <AnimatedSection>
      <div className="bg-ocean-50 rounded-xl p-6 md:p-8">
        <h3 className="font-serif text-xl font-semibold text-sage-800 mb-2">Helpful Resources</h3>
        <p className="text-sage-600 text-sm mb-6">
          If you or someone you know needs immediate support, these organisations can help.
        </p>

        <div className="space-y-4">
          {resources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg p-4 border border-ocean-100 hover:border-ocean-300 transition-colors group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-sage-800 group-hover:text-ocean-600 transition-colors">
                    {resource.name}
                  </h4>
                  <p className="text-sage-600 text-sm mt-0.5">{resource.description}</p>
                  {resource.phone && (
                    <p className="text-ocean-600 text-sm font-medium mt-1">{resource.phone}</p>
                  )}
                </div>
                <svg className="w-4 h-4 text-sage-300 group-hover:text-ocean-500 shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
