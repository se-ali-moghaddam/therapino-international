import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, ChartBar as BarChart2, Activity, RefreshCw } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import NetworkSidebar from '../../components/dashboard/NetworkSidebar';
import { mockNetworkAnalytics, rttNetworkStats } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function NetworkAnalyticsPage() {
  return (
    <div className="min-h-screen bg-calm-50">
      <NetworkSidebar />
      <div className="ml-56 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">Network Analytics</h1>
            <p className="text-calm-500 mt-1">Growth trends and network performance metrics</p>
          </motion.div>

          {/* Summary Cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-4 text-white shadow-sm">
              <TrendingUp size={20} className="mb-2 opacity-80" />
              <p className="text-2xl font-bold">+{rttNetworkStats.monthOverMonthGrowth}%</p>
              <p className="text-xs text-primary-200">Month-over-Month Growth</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-4 shadow-sm">
              <Users size={20} className="mb-2 text-teal-600" />
              <p className="text-2xl font-bold text-calm-900">{rttNetworkStats.practitioners.toLocaleString()}</p>
              <p className="text-xs text-calm-500">Total Practitioners</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-4 shadow-sm">
              <Calendar size={20} className="mb-2 text-primary-600" />
              <p className="text-2xl font-bold text-calm-900">1.2M</p>
              <p className="text-xs text-calm-500">Completed Sessions</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-4 shadow-sm">
              <RefreshCw size={20} className="mb-2 text-success-600" />
              <p className="text-2xl font-bold text-calm-900">{mockNetworkAnalytics.retentionRate[5].rate}%</p>
              <p className="text-xs text-calm-500">Retention Rate</p>
            </motion.div>
          </motion.div>

          {/* Growth Trends */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-teal-600" />
                <h3 className="font-bold text-calm-900">Network Growth Trend</h3>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-teal-500" /> Practitioners</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary-500" /> Clients</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={mockNetworkAnalytics.growthTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => [value.toLocaleString()]} />
                <Area type="monotone" dataKey="practitioners" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="clients" stroke="#3b97f3" fill="#3b97f3" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Session Volume */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 size={18} className="text-warning-600" />
                <h3 className="font-bold text-calm-900">Session Volume</h3>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={mockNetworkAnalytics.sessionVolume}>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={35} />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Line type="monotone" dataKey="sessions" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-2 text-xs text-calm-500 text-center">Monthly session counts</div>
            </motion.div>

            {/* Retention Rate */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw size={18} className="text-success-600" />
                <h3 className="font-bold text-calm-900">Retention Rate</h3>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={mockNetworkAnalytics.retentionRate}>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={35} />
                  <Tooltip formatter={(value) => value + '%'} />
                  <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: '#22c55e' }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-2 text-xs text-calm-500 text-center">6-month client retention</div>
            </motion.div>

            {/* Referral Rate */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Users size={18} className="text-primary-600" />
                <h3 className="font-bold text-calm-900">Referral Rate</h3>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={mockNetworkAnalytics.referralRate}>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} />
                  <YAxis domain={[30, 50]} tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={35} />
                  <Tooltip formatter={(value) => value + '%'} />
                  <Line type="monotone" dataKey="rate" stroke="#3b97f3" strokeWidth={2} dot={{ r: 3, fill: '#3b97f3' }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-2 text-xs text-calm-500 text-center">Client referral percentage</div>
            </motion.div>
          </div>

          {/* Network Insights */}
          <motion.div variants={fadeInUp} className="mt-6 bg-gradient-to-br from-teal-50 to-primary-50 rounded-2xl border border-teal-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-teal-600" />
              <h3 className="font-bold text-calm-900">Key Network Insights</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl">
                <p className="text-xs text-teal-600 font-medium mb-1">Rapid Growth</p>
                <p className="text-sm text-calm-700">Practitioner network grew {rttNetworkStats.monthOverMonthGrowth}% in the last month, driven by Europe and Asia expansion.</p>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <p className="text-xs text-primary-600 font-medium mb-1">High Retention</p>
                <p className="text-sm text-calm-700">Client retention reaching 94%, indicating strong satisfaction with RTT transformation outcomes.</p>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <p className="text-xs text-success-600 font-medium mb-1">Strong Referrals</p>
                <p className="text-sm text-calm-700">42% of new clients come from practitioner referrals, validating network quality perception.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
