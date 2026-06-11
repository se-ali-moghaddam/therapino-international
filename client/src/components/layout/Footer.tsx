import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram as Instagram, FaXTwitter as Twitter, FaLinkedin as LinkedIn } from "react-icons/fa6";

const footerLinks = {
  platform: [
    { label: 'About Us', href: '/about' },
    { label: 'Psychologists', href: '/psychologists' },
    { label: 'Resources', href: '/resources' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact Us', href: '/contact' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Report Issue', href: '/contact' },
    { label: 'Urgent Support', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-calm-900 text-calm-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">Therapino</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-calm-400 max-w-xs">
              Intelligent mental health platform combining AI and licensed psychologists. With you every step of your wellness journey.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-calm-800 flex items-center justify-center text-calm-400 hover:text-white hover:bg-primary-600 transition-all"><Instagram size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-xl bg-calm-800 flex items-center justify-center text-calm-400 hover:text-white hover:bg-primary-600 transition-all"><Twitter size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-xl bg-calm-800 flex items-center justify-center text-calm-400 hover:text-white hover:bg-primary-600 transition-all"><LinkedIn size={16} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2.5">{footerLinks.platform.map((link) => (<li key={link.href}><Link to={link.href} className="text-sm text-calm-400 hover:text-white transition-colors">{link.label}</Link></li>))}</ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5">{footerLinks.support.map((link) => (<li key={link.href}><Link to={link.href} className="text-sm text-calm-400 hover:text-white transition-colors">{link.label}</Link></li>))}</ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-calm-400"><Phone size={14} /> +1 (555) 423-4567</li>
              <li className="flex items-center gap-2 text-sm text-calm-400"><Mail size={14} /> support@therapino.com</li>
              <li className="flex items-start gap-2 text-sm text-calm-400"><MapPin size={14} className="mt-0.5 shrink-0" /> 123 Wellness Ave, Suite 400, San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-calm-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-calm-500">© 2024 Therapino. All rights reserved.</p>
          <div className="flex items-center gap-4">{footerLinks.legal.map((link) => (<Link key={link.href} to={link.href} className="text-xs text-calm-500 hover:text-calm-300 transition-colors">{link.label}</Link>))}</div>
        </div>
      </div>
    </footer>
  );
}
