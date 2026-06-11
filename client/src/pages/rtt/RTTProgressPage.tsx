import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Star, Target, Activity } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import RTTSidebar from '../../components/dashboard/RTTSidebar';
import { rttPractitionerStats, mockRTTClients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const weeklyProgress = [
  { week: 'W1', sessions: 8, breakthroughs: 2 },
  { week: 'W2', sessions: 10, breakthroughs: 4 },
  { week: 'W3', sessions: 9, breakthroughs: 5 },
  { week: 'W4', sessions: 12, breakthroughs: 7 },
  { week: 'W5', sessions: 11, breakthroughs: 6 },
  { week: 'W6', sessions: 14, breakthroughs: 9 },
];

const clientOutcomes = [
  { outcome: 'Belief Transformation', percentage: 85 },
  { outcome: 'Symptom Reduction', percentage: 78 },
  { outcome: 'Improved Self-Worth', percentage: 92 },
  { outcome: 'Better Relationships', percentage: 71 },
  { outcome: 'Anxiety Relief', percentage: 88 },
];

export default function RTTProgressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50 to-teal-50">
      <RTTSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">Client Progress</h1>
            <p className="text-calm-500 mt-1">Track RTT transformation outcomes and client growth</p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <TrendingUp size={20} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-calm-500">Improvement Rate</p>
                  <p className="text-2xl font-bold text-calm-900">{rttPractitionerStats.improvementRate}%</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Calendar size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-calm-500">Sessions This Month</p>
                  <p className="text-2xl font-bold text-calm-900">{rttPractitionerStats.sessionsCompleted}</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-warning-100 flex items-center justify-center">
                  <Star size={20} className="text-warning-600" />
                </div>
                <div>
                  <p className="text-xs text-calm-500">Client Satisfaction</p>
                  <p className="text-2xl font-bold text-calm-900">{rttPractitionerStats.clientSatisfaction}%</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                  <Users size={20} className="text-success-600" />
                </div>
                <div>
                  <p className="text-xs text-calm-500">Referral Rate</p>
                  <p className="text-2xl font-bold text-calm-900">{rttPractitionerStats.referralRate}%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Sessions & Breakthroughs */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Activity size={18} className="text-teal-600" />
                <h3 className="font-bold text-calm-900">Sessions & Breakthroughs</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sessions" stroke="#14b8a6" strokeWidth={2.5} name="Sessions" />
                  <Line type="monotone" dataKey="breakthroughs" stroke="#f59e0b" strokeWidth={2.5} name="Breakthroughs" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Client Outcomes */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Target size={18} className="text-primary-600" />
                <h3 className="font-bold text-calm-900">Client Outcomes</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={clientOutcomes} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis type="category" dataKey="outcome" tick={{ fontSize: 10, fill: '#64748b' }} width={110} />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#3b97f3" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Individual Client Progress */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm lg:col-span-2">
              <h3 className="font-bold text-calm-900 mb-5">Individual Client Progress</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockRTTClients.map((client) => (
                  <div key={client.id} className="p-4 bg-calm-50 rounded-xl border border-calm-100">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-calm-900 text-sm truncate">{client.name}</p>
                        <p className="text-xs text-calm-500">{client.sessionsCompleted}/{client.totalSessions} sessions</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-calm-500">Progress</span>
                        <span className="font-medium text-teal-600">{client.progress}%</span>
                      </div>
                      <div className="h-2 bg-calm-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-teal-400 to-primary-400 rounded-full" style={{ width: `${client.progress}%` }} />
                      </div>
                    </div>
                    <p className="text-xs text-calm-500 italic truncate">"{client.dominantBelief}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
