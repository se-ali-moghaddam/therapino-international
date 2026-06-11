import { motion } from 'framer-motion';
import { Users, Globe, ChartBar as BarChart2, TrendingUp, Star, Clock, Calendar as CalendarIcon, Activity } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import NetworkSidebar from '../../components/dashboard/NetworkSidebar';
import { rttNetworkStats, mockCountries, mockNetworkAnalytics } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const statsCards = [
  { label: 'RTT Practitioners', value: rttNetworkStats.practitioners.toLocaleString(), icon: Users, color: 'bg-primary-100 text-primary-600' },
  { label: 'Active Clients', value: rttNetworkStats.activeClients.toLocaleString(), icon: Users, color: 'bg-teal-100 text-teal-600' },
  { label: 'Countries', value: rttNetworkStats.countries.toString(), icon: Globe, color: 'bg-success-100 text-success-600' },
  { label: 'Sessions Completed', value: Math.round(rttNetworkStats.sessionsCompleted / 10000) + 'K', icon: BarChart2, color: 'bg-warning-100 text-warning-600' },
  { label: 'Client Satisfaction', value: rttNetworkStats.clientSatisfaction + '%', icon: Star, color: 'bg-primary-100 text-primary-600' },
  { label: 'Improvement Rate', value: rttNetworkStats.improvementRate + '%', icon: TrendingUp, color: 'bg-teal-100 text-teal-600' },
];

const globalSessionVolume = [
  { month: 'Jan', sessions: 180000 },
  { month: 'Feb', sessions: 195000 },
  { month: 'Mar', sessions: 205000 },
  { month: 'Apr', sessions: 198000 },
  { month: 'May', sessions: 210000 },
  { month: 'Jun', sessions: 225000 },
];

const continentDistribution = [
  { name: 'North America', value: 40, color: '#3b97f3' },
  { name: 'Europe', value: 30, color: '#14b8a6' },
  { name: 'Oceania', value: 15, color: '#f59e0b' },
  { name: 'Asia', value: 10, color: '#a855f7' },
  { name: 'Africa', value: 5, color: '#ef4444' },
];

export default function NetworkOverviewPage() {
  return (
    <div className="min-h-screen bg-calm-50">
      <NetworkSidebar />
      <div className="ml-56 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">RTT Network Dashboard</h1>
            <p className="text-calm-500 mt-1">Global view of the RTT ecosystem</p>
          </motion.div>

          {/* KPI Cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {statsCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-4 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                    <Icon size={18} />
                  </div>
                  <p className="text-2xl font-bold text-calm-900">{stat.value}</p>
                  <p className="text-xs text-calm-500">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Global Session Volume */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-calm-900">Global Session Volume</h3>
                <span className="text-xs text-calm-400">Last 6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={globalSessionVolume}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Sessions']} />
                  <Line type="monotone" dataKey="sessions" stroke="#3b97f3" strokeWidth={2.5} dot={{ r: 4, fill: '#3b97f3' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Geographic Distribution */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <h3 className="font-bold text-calm-900 mb-4">Global Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={continentDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                    {continentDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {continentDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-calm-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-calm-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Countries */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-calm-900">Top RTT Countries</h3>
                <span className="text-xs text-calm-400">By practitioners</span>
              </div>
              <div className="space-y-3">
                {mockCountries.slice(0, 6).map((country) => (
                  <div key={country.name} className="flex items-center gap-4">
                    <span className="text-2xl">{country.flag}</span>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-calm-800 text-sm">{country.name}</span>
                          <span className="text-xs text-calm-500">{country.practitioners} practitioners</span>
                        </div>
                      <div className="h-1.5 bg-calm-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-400 to-teal-400 rounded-full"
                          style={{ width: `${(country.practitioners / 4500) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-calm-400 w-20 text-right">{Math.round(country.sessions / 1000)}K sessions</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Metrics */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-primary-600 to-teal-600 rounded-2xl p-6 text-white shadow-sm">
              <h3 className="font-bold text-white mb-4">Network Growth</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-primary-100">Month-over-Month Growth</span>
                    <TrendingUp size={16} className="text-white" />
                  </div>
                  <p className="text-3xl font-bold">+{rttNetworkStats.monthOverMonthGrowth}%</p>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-100">Avg Session Duration</span>
                    <span className="font-semibold">{rttNetworkStats.avgSessionDuration} min</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-primary-200">
                  <Activity size={14} />
                  <span>Tracking 42 countries, 1.2M+ sessions</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
