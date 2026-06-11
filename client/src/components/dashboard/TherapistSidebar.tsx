import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, User, Activity, Brain, TriangleAlert as AlertTriangle, FileText, ClipboardList, ChartBar as BarChart2, Settings, LogOut, Brain as BrainIcon } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

const mainNav: NavItem[] = [
  { label: 'Overview', href: '/therapist', icon: LayoutDashboard },
  { label: 'Patients', href: '/therapist/patients', icon: Users },
  { label: 'Timeline', href: '/therapist/timeline', icon: Activity },
  { label: 'AI Insights', href: '/therapist/insights', icon: Brain },
  { label: 'Risk Detection', href: '/therapist/risk', icon: AlertTriangle, badge: 3 },
  { label: 'Session Notes', href: '/therapist/notes', icon: FileText },
  { label: 'Assignments', href: '/therapist/assignments', icon: ClipboardList },
  { label: 'Reports', href: '/therapist/reports', icon: BarChart2 },
];

export default function TherapistSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-calm-100 flex flex-col z-40">
      <div className="p-4 border-b border-calm-100">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
            <BrainIcon size={20} className="text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-calm-900">Therapino</span>
            <span className="block text-xs text-calm-400">Therapist Portal</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href ||
              (item.href !== '/therapist' && location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-calm-600 hover:text-calm-900 hover:bg-calm-50'
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-error-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-calm-100">
        <div className="flex items-center gap-3 p-3 bg-calm-50 rounded-xl mb-2">
          <img
            src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Dr. Sarah Mitchell"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-calm-800 truncate">Dr. Sarah Mitchell</p>
            <p className="text-xs text-calm-500">Clinical Psychologist</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/profile" className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm text-calm-600 hover:bg-calm-100 transition-colors">
            <Settings size={14} />
            Settings
          </Link>
          <Link to="/" className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm text-error-600 hover:bg-error-50 transition-colors">
            <LogOut size={14} />
            Exit
          </Link>
        </div>
      </div>
    </aside>
  );
}
