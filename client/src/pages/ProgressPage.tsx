import { motion } from 'framer-motion';
import { TrendingUp, Target, Calendar, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar } from 'recharts';
import Navbar from '../components/layout/Navbar';
import { mockMoodData, mockGoals, mockWellnessData } from '../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const weeklyData = [
  { week: 'Week 1', anxiety: 60, mood: 55, energy: 50 },
  { week: 'Week 2', anxiety: 55, mood: 60, energy: 58 },
  { week: 'Week 3', anxiety: 50, mood: 65, energy: 62 },
  { week: 'Week 4', anxiety: 45, mood: 70, energy: 68 },
  { week: 'Week 5', anxiety: 40, mood: 72, energy: 70 },
  { week: 'Week 6', anxiety: 38, mood: 75, energy: 72 },
];

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-calm-50">
      <Navbar isLoggedIn />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-8"><h1 className="text-2xl font-bold text-calm-900">Progress & Analytics</h1><p className="text-calm-500 mt-1">A comprehensive view of your wellness journey</p></motion.div>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[{ icon: TrendingUp, label: 'Overall Improvement', value: '+18%', sub: 'in 30 days', color: 'bg-success-100 text-success-600', trend: 'up' }, { icon: Target, label: 'Goals Achieved', value: '3/4', sub: 'this week', color: 'bg-primary-100 text-primary-600', trend: 'up' }, { icon: Calendar, label: 'Active Days', value: '26', sub: 'of 30 days', color: 'bg-teal-100 text-teal-600', trend: 'up' }, { icon: Award, label: 'Current Score', value: '72', sub: '+5 from before', color: 'bg-warning-100 text-warning-600', trend: 'up' }].map(({ icon: Icon, label, value, sub, color, trend }) => (<motion.div key={label} variants={fadeInUp} className="card"><div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 ${color}`}><Icon size={22} /></div><div className="flex items-end gap-2"><span className="text-2xl font-bold text-calm-900">{value}</span>{trend === 'up' ? <ArrowUp size={14} className="text-success-500 mb-1" /> : <ArrowDown size={14} className="text-error-500 mb-1" />}</div><p className="text-sm font-medium text-calm-700">{label}</p><p className="text-xs text-calm-400">{sub}</p></motion.div>))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp} className="card"><h3 className="font-bold text-calm-900 mb-5">Mood Trend (14 Days)</h3><ResponsiveContainer width="100%" height={200}><LineChart data={mockMoodData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="date" tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} interval={3} /><YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} /><Tooltip content={({ active, payload }) => active && payload?.length ? (<div className="bg-white border border-calm-200 rounded-xl px-3 py-2 text-xs shadow-sm"><p className="font-semibold">{payload[0].payload.date}</p><p className="text-primary-600">Score: {payload[0].value}/10</p></div>) : null} /><Line type="monotone" dataKey="score" stroke="#3b97f3" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} /></LineChart></ResponsiveContainer></motion.div>

            <motion.div variants={fadeInUp} className="card"><h3 className="font-bold text-calm-900 mb-5">Mental Wellness Profile</h3><ResponsiveContainer width="100%" height={200}><RadarChart data={mockWellnessData}><PolarGrid stroke="#e2e8f0" /><PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} /><Radar name="Score" dataKey="score" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.2} strokeWidth={2} /></RadarChart></ResponsiveContainer></motion.div>

            <motion.div variants={fadeInUp} className="card"><h3 className="font-bold text-calm-900 mb-5">Weekly Progress</h3><ResponsiveContainer width="100%" height={180}><BarChart data={weeklyData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} /><YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} /><Tooltip content={({ active, payload, label }) => active && payload?.length ? (<div className="bg-white border border-calm-200 rounded-xl px-3 py-2 text-xs shadow-sm space-y-1"><p className="font-semibold text-calm-800">{label}</p>{payload.map((p) => (<p key={p.name} style={{ color: p.color }}>{p.name === 'anxiety' ? 'Anxiety' : p.name === 'mood' ? 'Mood' : 'Energy'}: {p.value}</p>))}</div>) : null} /><Bar dataKey="mood" fill="#3b97f3" radius={[4, 4, 0, 0]} name="mood" /><Bar dataKey="energy" fill="#14b8a6" radius={[4, 4, 0, 0]} name="energy" /><Bar dataKey="anxiety" fill="#f59e0b" radius={[4, 4, 0, 0]} name="anxiety" /></BarChart></ResponsiveContainer><div className="flex gap-4 justify-center mt-3 text-xs text-calm-500"><div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-primary-500" />Mood</div><div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-teal-500" />Energy</div><div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-warning-500" />Anxiety</div></div></motion.div>

            <motion.div variants={fadeInUp} className="card"><h3 className="font-bold text-calm-900 mb-5">Goal Progress</h3><div className="space-y-4">{mockGoals.map((goal) => (<div key={goal.id}><div className="flex justify-between items-center mb-1.5"><div><p className="text-sm font-medium text-calm-800">{goal.title}</p><p className="text-xs text-calm-400">{goal.current} of {goal.target}</p></div><span className={`text-sm font-bold ${goal.progress >= 80 ? 'text-success-600' : goal.progress >= 50 ? 'text-primary-600' : 'text-warning-600'}`}>{goal.progress}%</span></div><div className="h-2 bg-calm-100 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${goal.progress}%` }} transition={{ duration: 0.8 }} className={`h-full rounded-full ${goal.progress >= 80 ? 'bg-success-500' : goal.progress >= 50 ? 'bg-primary-500' : 'bg-warning-500'}`} /></div></div>))}</div></motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
