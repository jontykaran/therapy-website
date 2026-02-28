import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className={`rounded-full p-0.5 transition-all duration-300 ${
              scrolled ? 'bg-white shadow-sm' : 'bg-white/90'
            }`}>
              <img
                src="/logo-kr.jpg"
                alt="Therapy By Rashi"
                className="h-10 md:h-12 w-10 md:w-12 rounded-full object-cover"
              />
            </div>
            <span className={`font-serif text-sm md:text-base font-semibold transition-colors hidden sm:inline ${
              scrolled ? 'text-sage-800' : 'text-white'
            }`}>
              Therapy By Rashi
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative group ${
                  scrolled ? 'text-sage-700 hover:text-sage-900' : 'text-white/90 hover:text-white'
                } ${location.pathname === link.path ? 'font-semibold' : ''}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full bg-warm-400' : 'w-0 group-hover:w-full bg-warm-300'
                }`} />
              </Link>
            ))}
            <Link
              to="/contact"
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                scrolled
                  ? 'bg-sage-600 text-white hover:bg-sage-700'
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
              }`}
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full transition-all duration-300 ${scrolled ? 'bg-sage-800' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full transition-all duration-300 ${scrolled ? 'bg-sage-800' : 'bg-white'} ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full transition-all duration-300 ${scrolled ? 'bg-sage-800' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-sage-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sage-700 hover:bg-sage-50 transition-colors ${
                    location.pathname === link.path ? 'bg-sage-50 font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block px-4 py-3 mt-2 rounded-full bg-sage-600 text-white text-center font-medium"
              >
                Book a Session
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
