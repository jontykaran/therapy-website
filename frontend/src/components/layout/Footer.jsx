import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-sage-800 text-sage-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src="/logo-horizontal.svg" alt="Therapy By Rashi" className="h-16 w-auto mb-4 opacity-90" />
            <p className="text-sage-300 text-sm leading-relaxed">
              Professional counselling and psychotherapy by Rashi Sharma.
              A safe, confidential space for healing and personal growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ & Resources</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-3">Get In Touch</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@therapybyrashi.com" className="hover:text-white transition-colors">
                  hello@therapybyrashi.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Online & In-Person Sessions</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-sage-700 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-sage-400">
          <p>&copy; {new Date().getFullYear()} Therapy By Rashi. All rights reserved.</p>
          <div className="flex gap-4">
            <span>MBACP Registered</span>
            <span>MNCS Accredited</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
