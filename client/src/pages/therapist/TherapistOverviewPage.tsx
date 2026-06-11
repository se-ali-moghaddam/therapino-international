import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Activity, TriangleAlert as AlertTriangle, TrendingUp, Calendar, Clock, Star, ChevronRight, CircleCheck as CheckCircle, Brain } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import TherapistSidebar from '../../components/dashboard/TherapistSidebar';
import { therapistDashboardStats, mockTherapistPatients, mockRiskAlerts } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const weeklyMoodData = [
  { day: 'Mon', avg: 5.2 },
  { day: 'Tue', avg: 5.8 },
  { day: 'Wed', avg: 5.5 },
  { day: 'Thu', avg: 6.1 },
  { day: 'Fri', avg: 6.4 },
  { day: 'Sat', avg: 6.8 },
  { day: 'Sun', avg: 6.9 },
];

const riskDistribution = [
  { name: 'Low', value: 60, color: '#22c55e' },
  { name: 'Medium', value: 25, color: '#f59e0b' },
  { name: 'High', value: 10, color: '#ef4444' },
  { name: 'Critical', value: 5, color: '#991b1b' },
];

export default function TherapistOverviewPage() {
  return (
    <div className="min-h-screen bg-calm-50">
      <TherapistSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-8">
          <motion.div variants={fadeInUp} className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-calm-900">Therapist Dashboard</h1>
              <p className="text-calm-500 mt-1">Welcome back, Dr. Mitchell</p>
            </div>
            <div className="flex gap-3">
              <Link to="/therapist/patients" className="btn-secondary flex items-center gap-2">
                <Users size={16} />View All Patients
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <motion.div variants={fadeInUp} className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <Users size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-calm-500">Total Patients</p>
                <p className="text-2xl font-bold text-calm-900">{therapistDashboardStats.totalPatients}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <Activity size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-calm-500">Active Patients</p>
                <p className="text-2xl font-bold text-calm-900">{therapistDashboardStats.activePatients}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-error-100 flex items-center justify-center">
                <AlertTriangle size={20} className="text-error-600" />
              </div>
              <div>
                <p className="text-xs text-calm-500">High Risk</p>
                <p className="text-2xl font-bold text-error-600">{therapistDashboardStats.highRiskPatients}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-success-600" />
              </div>
              <div>
                <p className="text-xs text-calm-500">Mood Improvement</p>
                <p className="text-2xl font-bold text-success-600">+{therapistDashboardStats.avgMoodImprovement}%</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-warning-100 flex items-center justify-center">
                <Calendar size={20} className="text-warning-600" />
              </div>
              <div>
                <p className="text-xs text-calm-500">Completion Rate</p>
                <p className="text-2xl font-bold text-calm-900">{therapistDashboardStats.sessionCompletionRate}%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Mood Trend */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-calm-900">Average Patient Mood (This Week)</h3>
                <span className="text-xs text-calm-400">Last 7 days</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyMoodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="bg-white border border-calm-200 rounded-xl px-3 py-2 text-xs shadow-sm">
                          <p className="font-semibold">Score: {payload[0].value}/10</p>
                        </div>
                      ) : null
                    }
                  />
                  <Line type="monotone" dataKey="avg" stroke="#3b97f3" strokeWidth={2.5} dot={{ r: 4, fill: '#3b97f3' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Patients */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-calm-900">Recent Patient Activity</h3>
                <Link to="/therapist/patients" className="text-xs text-primary-600 flex items-center gap-1">
                  See all <ChevronRight size={12} />
                </Link>
              </div>
              <div className="space-y-3">
                {mockTherapistPatients.slice(0, 4).map((patient) => (
                  <Link
                    key={patient.id}
                    to={`/therapist/patients/${patient.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-calm-50 transition-all group"
                  >
                    <img src={patient.avatar} alt={patient.name} className="w-11 h-11 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-calm-800">{patient.name}</p>
                      <p className="text-xs text-calm-500">{patient.condition}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          patient.riskLevel === 'Critical'
                            ? 'bg-error-100 text-error-700'
                            : patient.riskLevel === 'High'
                            ? 'bg-warning-100 text-warning-700'
                            : patient.riskLevel === 'Medium'
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-success-100 text-success-700'
                        }`}
                      >
                        {patient.riskLevel}
                      </span>
                      <span className="text-xs text-calm-400">{patient.lastActivity}</span>
                      <ChevronRight size={16} className="text-calm-300 group-hover:text-primary-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Risk Distribution */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="card">
              <h3 className="font-bold text-calm-900 mb-4">Risk Distribution</h3>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {riskDistribution.map((item) => (
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

            {/* Active Alerts */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-calm-900">Active Alerts</h3>
                <Link to="/therapist/risk" className="text-xs text-primary-600">View all</Link>
              </div>
              <div className="space-y-3">
                {mockRiskAlerts.slice(0, 3).map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-xl border ${
                      alert.type === 'Critical'
                        ? 'bg-error-50 border-error-200'
                        : alert.type === 'High'
                        ? 'bg-warning-50 border-warning-200'
                        : 'bg-primary-50 border-primary-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {alert.type === 'Critical' || alert.type === 'High' ? (
                        <AlertTriangle size={14} className={`${alert.type === 'Critical' ? 'text-error-500' : 'text-warning-500'} mt-0.5 flex-shrink-0`} />
                      ) : (
                        <Brain size={14} className="text-primary-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-calm-800">{alert.title}</p>
                        <p className="text-xs text-calm-500 mt-0.5">{alert.patientName}</p>
                      </div>
                      <span className="text-xs text-calm-400">{alert.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="card">
              <h3 className="font-bold text-calm-900 mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-calm-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-calm-400" />
                    <span className="text-sm text-calm-600">Sessions</span>
                  </div>
                  <span className="font-bold text-calm-800">{therapistDashboardStats.weeklySessions}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-calm-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-calm-400" />
                    <span className="text-sm text-calm-600">Avg Duration</span>
                  </div>
                  <span className="font-bold text-calm-800">{therapistDashboardStats.avgSessionDuration} min</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-calm-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-warning-400" />
                    <span className="text-sm text-calm-600">Satisfaction</span>
                  </div>
                  <span className="font-bold text-calm-800">{therapistDashboardStats.patientSatisfaction}%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
