import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Activity, Clock, Star, TrendingUp, Calendar, Heart, Brain, Sparkles } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import RTTSidebar from '../../components/dashboard/RTTSidebar';
import { rttPractitionerStats, mockRTTClients, mockLimitingBeliefs } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const clientProgressData = [
  { week: 'W1', clients: 32, completed: 4 },
  { week: 'W2', clients: 35, completed: 8 },
  { week: 'W3', clients: 38, completed: 12 },
  { week: 'W4', clients: 40, completed: 18 },
  { week: 'W5', clients: 44, completed: 24 },
  { week: 'W6', clients: 45, completed: 28 },
];

const beliefsDistribution = [
  { name: 'Self-Worth', value: 35, color: '#3b97f3' },
  { name: 'Confidence', value: 25, color: '#14b8a6' },
  { name: 'Anxiety', value: 20, color: '#f59e0b' },
  { name: 'Relationships', value: 20, color: '#a855f7' },
];

export default function RTTOverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50 to-teal-50">
      <RTTSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-8">
          <motion.div variants={fadeInUp} className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-calm-900">RTT Practitioner Dashboard</h1>
              <p className="text-calm-500 mt-1">Welcome back, Marisa</p>
            </div>
            <Link to="/rtt/session-prep" className="btn-teal flex items-center gap-2">
              <Calendar size={16} />Start Session Prep
            </Link>
          </motion.div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <Users size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-calm-500">Total Clients</p>
                <p className="text-2xl font-bold text-calm-900">{rttPractitionerStats.totalClients}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <Activity size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-calm-500">Active Clients</p>
                <p className="text-2xl font-bold text-calm-900">{rttPractitionerStats.activeClients}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-success-600" />
              </div>
              <div>
                <p className="text-xs text-calm-500">Sessions Completed</p>
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
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Progress */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-calm-900">Client Progress Over Time</h3>
                <span className="text-xs text-calm-400">Last 6 weeks</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={clientProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <Tooltip content={({ active, payload }) => active && payload?.length ? (
                    <div className="bg-white border border-calm-200 rounded-xl px-3 py-2 text-xs shadow-sm">
                      <p>Clients: {payload[0].value}</p>
                      <p>Completed Sessions: {payload[1].value}</p>
                    </div>
                  ) : null} />
                  <Line type="monotone" dataKey="clients" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 4, fill: '#14b8a6' }} />
                  <Line type="monotone" dataKey="completed" stroke="#3b97f3" strokeWidth={2.5} dot={{ r: 4, fill: '#3b97f3' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Clients */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-calm-900">Active RTT Clients</h3>
                <Link to="/rtt/clients" className="text-xs text-teal-600 hover:text-teal-700">View all</Link>
              </div>
              <div className="space-y-3">
                {mockRTTClients.map((client) => (
                  <Link
                    key={client.id}
                    to={`/rtt/clients/${client.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-calm-50 transition-all group"
                  >
                    <img src={client.avatar} alt={client.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold text-calm-800">{client.name}</p>
                      <p className="text-xs text-calm-500">{client.dominantBelief}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-calm-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-teal-400 to-primary-400 rounded-full" style={{ width: `${client.progress}%` }} />
                        </div>
                        <span className="text-xs text-calm-500">{client.sessionsCompleted}/{client.totalSessions}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      client.status === 'Completing' ? 'bg-success-100 text-success-700' :
                      client.status === 'In Progress' ? 'bg-primary-100 text-primary-700' :
                      'bg-calm-100 text-calm-600'
                    }`}>{client.status}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Belief Focus */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Brain size={18} className="text-primary-600" />
                <h3 className="font-bold text-calm-900">Common Belief Focus</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-28 h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={beliefsDistribution} cx="50%" cy="50%" innerRadius={25} outerRadius={45} paddingAngle={2} dataKey="value">
                        {beliefsDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {beliefsDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-calm-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-calm-800">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Top Beliefs Addressed */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-gradient-to-br from-teal-600 to-primary-700 rounded-2xl p-6 text-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} />
                <h3 className="font-bold">Top Beliefs Addressed</h3>
              </div>
              <div className="space-y-3">
                {mockLimitingBeliefs.slice(0, 4).map((b) => (
                  <div key={b.belief}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/80">"{b.belief}"</span>
                      <span className="font-medium">{b.confidence}%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${b.confidence}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <h3 className="font-bold text-calm-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-calm-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-calm-400" />
                    <span className="text-sm text-calm-600">Avg Session Duration</span>
                  </div>
                  <span className="font-bold text-calm-800">{rttPractitionerStats.avgSessionDuration} min</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-calm-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-success-500" />
                    <span className="text-sm text-calm-600">Improvement Rate</span>
                  </div>
                  <span className="font-bold text-success-600">{rttPractitionerStats.improvementRate}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-calm-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-primary-500" />
                    <span className="text-sm text-calm-600">Referral Rate</span>
                  </div>
                  <span className="font-bold text-calm-800">{rttPractitionerStats.referralRate}%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
