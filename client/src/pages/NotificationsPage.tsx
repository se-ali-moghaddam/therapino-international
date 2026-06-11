import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Bell, Calendar, MessageCircle, TrendingUp, Heart, Award, Check, Trash2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { mockNotifications } from '../data/mockData';

const iconMap: Record<string, LucideIcon> = { calendar: Calendar, message: MessageCircle, 'trending-up': TrendingUp, heart: Heart, award: Award };
const colorMap: Record<string, string> = { session: 'bg-primary-100 text-primary-600', message: 'bg-teal-100 text-teal-600', progress: 'bg-success-100 text-success-600', suggestion: 'bg-warning-100 text-warning-600', achievement: 'bg-error-100 text-error-600' };

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter((n) => !n.read).length;
  const markAllRead = () => { setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))); };
  const dismiss = (id: string) => { setNotifications((prev) => prev.filter((n) => n.id !== id)); };

  return (
    <div className="min-h-screen bg-calm-50">
      <Navbar isLoggedIn />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl font-bold text-calm-900">Notifications</h1>{unread > 0 && (<p className="text-sm text-calm-500 mt-1">{unread} unread notifications</p>)}</div>
          {unread > 0 && (<button onClick={markAllRead} className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"><Check size={14} />Mark all read</button>)}
        </div>

        {notifications.length === 0 ? (<div className="text-center py-16"><Bell size={48} className="text-calm-300 mx-auto mb-4" /><p className="text-calm-500">No notifications</p></div>) : (<div className="space-y-3">{notifications.map((n) => { const Icon = iconMap[n.icon] || Bell; const colorClass = colorMap[n.type] || 'bg-calm-100 text-calm-600'; return (<motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} layout className={`bg-white rounded-2xl border shadow-sm p-4 flex items-start gap-4 ${n.read ? 'border-calm-100' : 'border-primary-200'}`}><div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}><Icon size={18} /></div><div className="flex-1"><div className="flex items-start justify-between"><p className={`text-sm font-semibold ${n.read ? 'text-calm-700' : 'text-calm-900'}`}>{n.title}</p>{!n.read && <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />}</div><p className="text-sm text-calm-500 mt-0.5">{n.message}</p><p className="text-xs text-calm-400 mt-2">{n.time}</p></div><button onClick={() => dismiss(n.id)} className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-calm-300 hover:text-error-500 hover:bg-error-50 transition-all"><Trash2 size={14} /></button></motion.div>); })}</div>)}
      </div>
    </div>
  );
}
