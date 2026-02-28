import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../common/AnimatedSection'
import { faqs } from './faqData'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-sage-100 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-sage-50 transition-colors"
      >
        <span className="font-medium text-sage-800 pr-4">{faq.question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-sage-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-4 text-sage-600 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <AnimatedSection key={idx} delay={idx * 0.05}>
          <FAQItem
            faq={faq}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        </AnimatedSection>
      ))}
    </div>
  )
}
