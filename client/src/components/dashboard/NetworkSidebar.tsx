import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Globe, ChartBar as BarChart2, ChartPie as PieChart, Settings, LogOut, Users, Target, TrendingUp } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const mainNav: NavItem[] = [
  { label: 'Overview', href: '/network', icon: LayoutDashboard },
  { label: 'Countries', href: '/network/countries', icon: Globe },
  { label: 'Outcomes', href: '/network/outcomes', icon: Target },
  { label: 'Analytics', href: '/network/analytics', icon: BarChart2 },
];

export default function NetworkSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-gradient-to-b from-primary-900 to-calm-900 flex flex-col z-40">
      <div className="p-4 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-teal-400 rounded-xl flex items-center justify-center shadow-sm">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-white">Therapino</span>
            <span className="block text-xs text-primary-300">RTT Network</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href ||
              (item.href !== '/network' && location.pathname.startsWith(item.href));

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
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-white/10">
        <div className="flex gap-2">
          <Link to="/" className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <LogOut size={14} />
            Exit
          </Link>
        </div>
      </div>
    </aside>
  );
}
