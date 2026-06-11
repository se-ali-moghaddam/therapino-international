import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, TrendingUp, Calendar, ArrowLeft, Plus, Star, Activity, Target, Flame, BookOpen, Wind, Sun, Smile, Frown, Meh } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/layout/Navbar';
import { mockMoodData, mockChatHistory, mockActivities, mockGoals, mockPsychologists, mockAppointments, mockUserProfile } from '../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const moodOptions = [{ icon: Frown, label: 'Low', value: 2, color: 'text-error-500' }, { icon: Meh, label: 'Fair', value: 5, color: 'text-warning-500' }, { icon: Smile, label: 'Good', value: 8, color: 'text-success-500' }];

const iconMap: Record<string, LucideIcon> = { wind: Wind, sun: Sun, 'book-open': BookOpen, footprints: Activity };

export default function DashboardPage() {
  const user = mockUserProfile;

  return (
    <div className="min-h-screen bg-calm-50">
      <Navbar isLoggedIn />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-8">
          <motion.div variants={fadeInUp} className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Welcome, {user.name.split(' ')[0]}! 👋</h1>
              <p className="text-calm-500 mt-1">How are you today? AI is ready to listen.</p>
            </div>
            <Link to="/chat" className="hidden sm:flex items-center gap-2 btn-primary"><MessageCircle size={18} />Start Chat</Link>
          </motion.div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="card bg-gradient-to-br from-primary-500 to-primary-700 border-0 text-white">
              <p className="text-primary-100 text-sm mb-2">Mental Wellness Score</p>
              <div className="flex items-end gap-2"><span className="text-4xl font-bold">{user.wellnessScore}</span><span className="text-primary-200 mb-1">/100</span></div>
              <div className="mt-3 h-2 bg-primary-400/50 rounded-full"><motion.div initial={{ width: 0 }} animate={{ width: `${user.wellnessScore}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-white rounded-full" /></div>
              <p className="text-primary-100 text-xs mt-2">+5 from last week</p>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <div className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-warning-100 rounded-2xl flex items-center justify-center"><Flame size={24} className="text-warning-500" /></div>
              <div><p className="text-2xl font-bold text-calm-900">{user.streakDays} Days</p><p className="text-sm text-calm-500">Streak</p></div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <div className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center"><Activity size={24} className="text-teal-600" /></div>
              <div><p className="text-2xl font-bold text-calm-900">{user.sessionsCompleted}</p><p className="text-sm text-calm-500">Sessions Completed</p></div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <div className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center"><Star size={24} className="text-primary-600" /></div>
              <div><p className="text-sm font-bold text-calm-900">{user.subscription} Plan</p><p className="text-xs text-calm-500">Until July 15, 2024</p></div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="card">
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-calm-900">Log Today's Mood</h3><span className="text-xs text-calm-400">Thursday, June 20</span></div>
              <div className="flex gap-4 mb-6">{moodOptions.map(({ icon: Icon, label, color }) => (<button key={label} className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-calm-200 hover:border-primary-300 hover:bg-primary-50 transition-all group"><Icon size={28} className={`${color} group-hover:scale-110 transition-transform`} /><span className="text-sm text-calm-600">{label}</span></button>))}</div>
              <div><p className="text-xs text-calm-400 mb-3">Last 7 days trend</p><ResponsiveContainer width="100%" height={80}><LineChart data={mockMoodData.slice(-7)}><Line type="monotone" dataKey="score" stroke="#3b97f3" strokeWidth={2.5} dot={{ r: 3, fill: '#3b97f3' }} /><Tooltip content={({ active, payload }) => active && payload?.length ? (<div className="bg-white border border-calm-200 rounded-xl px-3 py-2 text-xs shadow-sm"><p className="font-semibold">{payload[0].payload.date}</p><p className="text-primary-600">Score: {payload[0].value}</p></div>) : null} /></LineChart></ResponsiveContainer></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
              <div className="flex items-center justify-between mb-6"><h3 className="font-bold text-calm-900">Mood Trend</h3><Link to="/progress" className="text-xs text-primary-600 flex items-center gap-1 hover:text-primary-700">View All <ArrowLeft size={12} /></Link></div>
              <ResponsiveContainer width="100%" height={160}><LineChart data={mockMoodData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} interval={2} /><YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} /><Tooltip content={({ active, payload }) => active && payload?.length ? (<div className="bg-white border border-calm-200 rounded-xl px-3 py-2 text-xs shadow-sm"><p className="font-semibold text-calm-700">{payload[0].payload.date}</p><p className="text-primary-600">Score: {payload[0].value}/10</p></div>) : null} /><Line type="monotone" dataKey="score" stroke="#3b97f3" strokeWidth={2.5} dot={{ r: 3, fill: '#3b97f3', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 5 }} /></LineChart></ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
              <div className="flex items-center justify-between mb-5"><h3 className="font-bold text-calm-900">Recent Conversations</h3><Link to="/chat" className="text-xs text-primary-600 flex items-center gap-1">View All <ArrowLeft size={12} /></Link></div>
              <div className="space-y-3">{mockChatHistory.slice(0, 3).map((chat) => (<Link key={chat.id} to="/chat" className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-calm-50 transition-all group"><div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0"><MessageCircle size={18} className="text-primary-600" /></div><div className="flex-1 min-w-0"><p className="text-sm font-medium text-calm-800 truncate">{chat.title}</p><p className="text-xs text-calm-400 truncate">{chat.preview}</p></div><div className="text-right flex-shrink-0"><p className="text-xs text-calm-400">{chat.date}</p><div className={`text-xs mt-1 font-medium ${chat.moodScore >= 7 ? 'text-success-600' : chat.moodScore >= 5 ? 'text-warning-600' : 'text-error-500'}`}>{chat.mood}</div></div></Link>))}</div>
              <Link to="/chat" className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-calm-200 text-calm-400 hover:text-primary-600 hover:border-primary-300 transition-all text-sm"><Plus size={16} />New Conversation</Link>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card">
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-calm-900 text-sm">Recommended Psychologist</h3><Link to="/psychologists" className="text-xs text-primary-600">All</Link></div>
              {(() => { const p = mockPsychologists[0]; return (<div><div className="flex items-center gap-3 mb-3"><img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-xl object-cover" /><div><p className="font-semibold text-calm-800 text-sm">{p.name}</p><p className="text-xs text-calm-500">{p.title}</p><div className="flex items-center gap-1 mt-0.5"><Star size={11} className="fill-warning-400 text-warning-400" /><span className="text-xs text-warning-600 font-medium">{p.rating}</span><span className="text-xs text-calm-400">({p.reviewCount})</span></div></div></div><div className="flex flex-wrap gap-1 mb-3">{p.specialties.slice(0, 3).map((s) => (<span key={s} className="bg-primary-50 text-primary-600 text-xs px-2 py-0.5 rounded-full">{s}</span>))}</div><Link to={`/psychologists/${p.id}`} className="block text-center w-full py-2.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-xl hover:bg-primary-100 transition-colors">Book Session</Link></div>); })()}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card">
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-calm-900 text-sm">Upcoming Sessions</h3><Calendar size={16} className="text-calm-400" /></div>
              {mockAppointments.filter((a) => a.status === 'upcoming').map((apt) => (<div key={apt.id} className="bg-primary-50 rounded-xl p-4"><div className="flex items-center justify-between mb-2"><p className="text-sm font-semibold text-calm-800">{apt.psychologistName}</p><span className="badge-primary text-xs">Online</span></div><div className="flex items-center gap-4 text-xs text-calm-500"><span>{apt.date}</span><span>{apt.time}</span><span>{apt.duration} min</span></div><button className="mt-3 w-full py-2 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition-colors">Join Session</button></div>))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="card">
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-calm-900 text-sm">Weekly Goals</h3><Target size={16} className="text-calm-400" /></div>
              <div className="space-y-3">{mockGoals.slice(0, 3).map((goal) => (<div key={goal.id}><div className="flex justify-between text-xs mb-1.5"><span className="text-calm-700">{goal.title}</span><span className="text-primary-600 font-medium">{goal.progress}%</span></div><div className="h-1.5 bg-calm-100 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${goal.progress}%` }} transition={{ duration: 0.8, delay: 0.5 }} className={`h-full rounded-full ${goal.progress >= 80 ? 'bg-success-500' : goal.progress >= 50 ? 'bg-primary-500' : 'bg-warning-500'}`} /></div></div>))}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="card">
              <h3 className="font-bold text-calm-900 text-sm mb-4">Recommended Activities</h3>
              <div className="space-y-2.5">{mockActivities.map((act) => { const Icon: LucideIcon = iconMap[act.icon] || Activity; return (<button key={act.id} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-calm-50 transition-all text-left"><div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0"><Icon size={16} className="text-teal-600" /></div><div className="flex-1 min-w-0"><p className="text-sm font-medium text-calm-800">{act.title}</p><p className="text-xs text-calm-400">{act.duration}</p></div><TrendingUp size={14} className="text-calm-300" /></button>); })}</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
