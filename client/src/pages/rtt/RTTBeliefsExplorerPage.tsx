import { motion } from 'framer-motion';
import { Brain, TrendingUp, TriangleAlert as AlertTriangle, ChartBar as BarChart2, Info } from 'lucide-react';
import {
  RadarChart, RadarChartProps, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer
} from 'recharts';
import RTTSidebar from '../../components/dashboard/RTTSidebar';
import { mockLimitingBeliefs, mockRTTClients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const beliefCategories = [
  { category: 'Self-Worth', beliefs: ['I am not enough', 'I am not worthy', 'I don\'t matter'], avgConfidence: 85 },
  { category: 'Love & Acceptance', beliefs: ['I am unlovable', 'I will be rejected', 'I don\'t belong'], avgConfidence: 78 },
  { category: 'Safety & Trust', beliefs: ['I am unsafe', 'I can\'t trust anyone', 'The world is dangerous'], avgConfidence: 68 },
  { category: 'Success & Control', beliefs: ['I will fail', 'I am powerless', 'I have no choice'], avgConfidence: 70 },
];

const radarData = mockLimitingBeliefs.map((b) => ({
  belief: b.belief.length > 15 ? b.belief.substring(0, 15) + '...' : b.belief,
  fullBelief: b.belief,
  confidence: b.confidence,
}));

export default function RTTBeliefsExplorerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50 to-teal-50">
      <RTTSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">Beliefs Explorer</h1>
            <p className="text-calm-500 mt-1">AI-detected limiting beliefs across your clients</p>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={fadeInUp} className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-warning-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-warning-800">
                These are AI-detected patterns based on client conversations and assessments. All beliefs should be validated through clinical sessions.
              </p>
            </div>
          </motion.div>

          {/* Overall Belief Confidence */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-teal-600 to-primary-700 rounded-2xl p-6 text-white mb-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">Top Limiting Beliefs Detected</h2>
                <p className="text-sm text-white/80">Confidence levels based on AI analysis of client expressions</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{mockLimitingBeliefs.length}</p>
                <p className="text-sm text-white/80">Unique beliefs</p>
              </div>
            </div>
          </motion.div>

          {/* Belief Confidence Cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {mockLimitingBeliefs.map((belief) => (
              <motion.div key={belief.belief} variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain size={16} className="text-primary-600" />
                      <span className="text-xs text-calm-500">Limiting Belief</span>
                    </div>
                    <h3 className="font-bold text-calm-900">"{belief.belief}"</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold" style={{ backgroundColor: belief.color + '20', color: belief.color }}>
                    {belief.confidence}%
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-calm-500">Detection Confidence</span>
                    <span className="font-medium">{belief.confidence}%</span>
                  </div>
                  <div className="h-2 bg-calm-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${belief.confidence}%`, backgroundColor: belief.color }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-calm-500 italic">
                    {belief.confidence >= 80 ? 'High confidence detection' :
                     belief.confidence >= 65 ? 'Moderate confidence' : 'Early detection'}
                  </span>
                  <span className="text-teal-600 font-medium">Explore</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Belief Categories */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 size={18} className="text-teal-600" />
              <h3 className="font-bold text-calm-900">Belief Category Distribution</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {beliefCategories.map((cat) => (
                <div key={cat.category} className="p-4 bg-calm-50 rounded-xl border border-calm-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-calm-800">{cat.category}</h4>
                    <span className="text-sm font-bold text-teal-600">{cat.avgConfidence}%</span>
                  </div>
                  <ul className="space-y-2">
                    {cat.beliefs.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-calm-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                        "{b}"
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
            <h3 className="font-bold text-calm-900 mb-4">Belief Detection Intensity</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="belief" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Radar name="Confidence" dataKey="confidence" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="space-y-4">
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-teal-600" />
                    <span className="font-semibold text-teal-800">Treatment Focus Suggestion</span>
                  </div>
                  <p className="text-sm text-teal-700">
                    The highest confidence beliefs relate to self-worth issues. Consider making this the primary focus
                    of initial sessions for new clients.
                  </p>
                </div>
                <div className="p-4 bg-warning-50 rounded-xl border border-warning-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-warning-600" />
                    <span className="font-semibold text-warning-800">Pattern Alert</span>
                  </div>
                  <p className="text-sm text-warning-700">
                    "I must please everyone" is appearing more frequently. This may indicate a broader social trend
                    worth exploring in group work.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
