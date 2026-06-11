import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, Brain, Heart, Clock, Calendar, Headphones, ChartBar as BarChart2, Settings, LogOut, Sparkles, CircleAlert as AlertCircle, BookOpen } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

const mainNav: NavItem[] = [
  { label: 'Overview', href: '/rtt', icon: LayoutDashboard },
  { label: 'Clients', href: '/rtt/clients', icon: Users },
  { label: 'Beliefs Explorer', href: '/rtt/beliefs', icon: Brain },
  { label: 'Emotional Patterns', href: '/rtt/emotions', icon: Heart },
  { label: 'Childhood Events', href: '/rtt/childhood', icon: AlertCircle },
  { label: 'Session Prep', href: '/rtt/session-prep', icon: Calendar },
  { label: 'Post Session', href: '/rtt/post-session', icon: Clock },
  { label: 'Audio Programs', href: '/rtt/audio', icon: Headphones },
  { label: 'Progress', href: '/rtt/progress', icon: BarChart2 },
  { label: 'Reports', href: '/rtt/reports', icon: BookOpen },
];

export default function RTTSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-teal-900 to-primary-900 flex flex-col z-40">
      <div className="p-4 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-primary-400 rounded-xl flex items-center justify-center shadow-sm">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-white">Therapino</span>
            <span className="block text-xs text-teal-300">RTT Practitioner Portal</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href ||
              (item.href !== '/rtt' && location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-teal-400 text-primary-900 text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl mb-2">
          <img
            src="https://images.pexels.com/photos/5324986/pexels-photo-5324986.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="RTT Practitioner"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Marisa Thompson</p>
            <p className="text-xs text-teal-300">RTT Practitioner</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/profile" className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <Settings size={14} />
            Settings
          </Link>
          <Link to="/" className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm text-teal-300 hover:text-teal-200 hover:bg-white/10 transition-colors">
            <LogOut size={14} />
            Exit
          </Link>
        </div>
      </div>
    </aside>
  );
}
