import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  Brain, Menu, X, Bell, User, ChevronDown, MessageCircle, BarChart2, BookOpen, Users, Home, LogOut, Settings,
} from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

type NavLink = { label: string; href: string; icon?: LucideIcon };

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Psychologists', href: '/psychologists' },
  { label: 'Resources', href: '/resources' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const dashboardLinks: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'AI Chat', href: '/chat', icon: MessageCircle },
  { label: 'Psychologists', href: '/psychologists', icon: Users },
  { label: 'Progress', href: '/progress', icon: BarChart2 },
  { label: 'Resources', href: '/resources', icon: BookOpen },
];

export default function Navbar({ isLoggedIn = false, onLoginClick, onRegisterClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = isLoggedIn ? dashboardLinks : navLinks;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-calm-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Brain size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-calm-900">Therapino</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-calm-600 hover:text-calm-900 hover:bg-calm-50'
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/notifications" className="relative w-9 h-9 flex items-center justify-center rounded-xl text-calm-500 hover:text-calm-700 hover:bg-calm-100 transition-all">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full" />
                </Link>
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-calm-50 transition-all">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-calm-700">John Anderson</span>
                    <ChevronDown size={14} className="text-calm-400" />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-calm-100 py-2 z-50"
                        onMouseLeave={() => setUserMenuOpen(false)}
                      >
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-calm-700 hover:bg-calm-50 transition-colors">
                          <User size={16} /> My Profile
                        </Link>
                        <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-calm-700 hover:bg-calm-50 transition-colors">
                          <Settings size={16} /> Settings
                        </Link>
                        <hr className="my-1 border-calm-100" />
                        <Link to="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-error-600 hover:bg-error-50 transition-colors">
                          <LogOut size={16} /> Sign Out
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <button onClick={onLoginClick} className="px-5 py-2.5 text-sm font-medium text-calm-700 hover:text-calm-900 hover:bg-calm-50 rounded-xl transition-all">Sign In</button>
                <button onClick={onRegisterClick} className="px-5 py-2.5 text-sm font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-sm hover:shadow-md">Sign Up Free</button>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl text-calm-600 hover:bg-calm-100 transition-all">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-calm-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-calm-700 hover:bg-calm-50 transition-all">
                    {Icon && <Icon size={18} />} {link.label}
                  </Link>
                );
              })}
              {!isLoggedIn && (
                <div className="pt-3 flex gap-2">
                  <button onClick={() => { onLoginClick?.(); setMobileOpen(false); }} className="flex-1 py-2.5 text-sm font-medium border border-calm-200 rounded-xl text-calm-700 hover:bg-calm-50 transition-all">Sign In</button>
                  <button onClick={() => { onRegisterClick?.(); setMobileOpen(false); }} className="flex-1 py-2.5 text-sm font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all">Sign Up</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
