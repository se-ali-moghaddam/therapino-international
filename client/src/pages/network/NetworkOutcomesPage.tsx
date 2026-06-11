import { motion } from 'framer-motion';
import { Target, TrendingUp, Heart, Moon, Activity, Users } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import NetworkSidebar from '../../components/dashboard/NetworkSidebar';
import { mockNetworkOutcomes, rttNetworkStats } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const categoryIcons = {
  'Mood Improvement': TrendingUp,
  'Stress Reduction': Heart,
  'Sleep Quality': Moon,
  'Self-Worth': Activity,
  'Confidence': Target,
  'Relationships': Users,
};

const radarData = mockNetworkOutcomes.map((o) => ({
  category: o.category.length > 12 ? o.category.substring(0, 12) : o.category,
  fullCategory: o.category,
  before: o.before,
  after: o.after,
}));export default function NetworkOutcomesPage() {
  return (
    <div className="min-h-screen bg-calm-50">
      <NetworkSidebar />
      <div className="ml-56 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">RTT Treatment Outcomes</h1>
            <p className="text-calm-500 mt-1">Global transformation metrics across the RTT network</p>
          </motion.div>

          {/* Summary Cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {mockNetworkOutcomes.map((outcome) => {
              const Icon = categoryIcons[outcome.category as keyof typeof categoryIcons] || Target;
              return (
                <motion.div key={outcome.category} variants={fadeInUp} className="bg-white rounded-xl border border-calm-100 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className={outcome.improvement > 50 ? 'text-success-500' : 'text-teal-500'} />
                    <span className="text-[10px] text-calm-500 truncate">{outcome.category}</span>
                  </div>
                  <p className="text-lg font-bold text-calm-900">+{outcome.improvement}%</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-calm-500">
                    <span>{outcome.before}</span>
                    <span>→</span>
                    <span className="text-success-600">{outcome.after}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Before/After Chart */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-calm-900">Before & After Scores</h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-error-400" /><span className="text-calm-500">Before RTT</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-teal-500" /><span className="text-calm-500">After RTT</span></div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockNetworkOutcomes} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} width={110} />
                <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => value + '/10'} />
                <Bar dataKey="before" fill="#ef4444" radius={[0, 4, 4, 0]} name="Before" />
                <Bar dataKey="after" fill="#14b8a6" radius={[0, 4, 4, 0]} name="After" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target size={18} className="text-teal-600" />
                <h3 className="font-bold text-calm-900">Outcome Profile</h3>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <Radar name="Before" dataKey="before" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="After" dataKey="after" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-2 text-xs text-calm-500">
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-error-400" />Before RTT</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-teal-500" />After RTT</span>
              </div>
            </motion.div>

            {/* Improvement Breakdown */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-primary-600" />
                <h3 className="font-bold text-calm-900">Total Improvement Percentage</h3>
              </div>
              <div className="space-y-4">
                {mockNetworkOutcomes.map((outcome) => (
                  <div key={outcome.category}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        {categoryIcons[outcome.category as keyof typeof categoryIcons] && (
                          <span className="w-6">
                            {(() => {
                              const IconComp = categoryIcons[outcome.category as keyof typeof categoryIcons];
                              return <IconComp size={14} className="text-calm-400" />;
                            })()}
                          </span>
                        )}
                        <span className="text-sm text-calm-700">{outcome.category}</span>
                      </div>
                      <span className="font-bold text-calm-900">{outcome.improvement > 0 ? '+' : ''}{outcome.improvement}%</span>
                    </div>
                    <div className="h-2 bg-calm-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${outcome.improvement > 80 ? 'bg-success-500' : outcome.improvement > 50 ? 'bg-teal-500' : 'bg-primary-500'}`}
                        style={{ width: `${outcome.improvement}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-primary-50 to-teal-50 rounded-xl">
                <p className="text-sm text-primary-800">
                  <span className="font-semibold">{rttNetworkStats.improvementRate}%</span> of RTT clients report positive transformation outcomes within 30 days of completing their program.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
