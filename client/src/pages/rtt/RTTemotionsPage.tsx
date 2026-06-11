import { motion } from 'framer-motion';
import { Heart, Pi, Info } from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip
} from 'recharts';
import RTTSidebar from '../../components/dashboard/RTTSidebar';
import { mockEmotionalPatterns, mockRTTClients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const emotionInsights = [
  { emotion: 'Fear', description: 'Often related to uncertainty and future-oriented anxieties. Common in high-achiever clients.', sessions: 45 },
  { emotion: 'Shame', description: 'Deeply connected to self-worth beliefs. A core emotion underlying many limiting beliefs.', sessions: 38 },
  { emotion: 'Rejection', description: 'Linked to relationship patterns and childhood attachment experiences.', sessions: 35 },
  { emotion: 'Abandonment', description: 'Connected to early relationship dynamics and trust issues.', sessions: 42 },
  { emotion: 'Guilt', description: 'Related to internalized expectations and "should" statements.', sessions: 28 },
  { emotion: 'Sadness', description: 'Often suppressed; connected to unprocessed loss or grief.', sessions: 32 },
];

const radarData = mockEmotionalPatterns.map((e) => ({
  emotion: e.emotion,
  frequency: e.frequency,
}));

export default function RTTemotionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50 to-teal-50">
      <RTTSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">Emotional Patterns</h1>
            <p className="text-calm-500 mt-1">Distribution of dominant emotions across RTT client sessions</p>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={fadeInUp} className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-primary-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-primary-800">
                Emotion frequencies are derived from AI analysis of session transcripts, journal entries, and client expressions. These patterns help inform therapeutic direction.
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Radar Chart */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Heart size={18} className="text-error-500" />
                <h3 className="font-bold text-calm-900">Emotional Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="emotion" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <PolarRadiusAxis domain={[0, 50]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Radar name="Frequency" dataKey="frequency" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Pi size={18} className="text-teal-600" />
                <h3 className="font-bold text-calm-900">Emotion Percentage</h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={mockEmotionalPatterns}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="frequency"
                    label={({ emotion, percent }) => `${emotion} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {mockEmotionalPatterns.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Emotion Insights */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-4">
              <h2 className="text-lg font-bold text-calm-900">Emotion Breakdown & Insights</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emotionInsights.map((insight) => (
                <motion.div key={insight.emotion} variants={fadeInUp} className="bg-white rounded-xl border border-calm-100 p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mockEmotionalPatterns.find(e => e.emotion === insight.emotion)?.color }} />
                      <h4 className="font-bold text-calm-900">{insight.emotion}</h4>
                    </div>
                    <span className="text-xs bg-calm-100 text-calm-600 px-2 py-1 rounded-full">
                      {insight.sessions} sessions
                    </span>
                  </div>
                  <p className="text-sm text-calm-600 leading-relaxed">{insight.description}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-calm-500">Frequency</span>
                      <span className="font-medium">{mockEmotionalPatterns.find(e => e.emotion === insight.emotion)?.frequency}%</span>
                    </div>
                    <div className="h-1.5 bg-calm-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(mockEmotionalPatterns.find(e => e.emotion === insight.emotion)?.frequency || 0) * 2}%`,
                          backgroundColor: mockEmotionalPatterns.find(e => e.emotion === insight.emotion)?.color
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div variants={fadeInUp} className="mt-6 bg-gradient-to-br from-primary-50 to-teal-50 rounded-2xl border border-primary-200 p-6">
            <h3 className="font-bold text-calm-900 mb-4">RTT Treatment Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-xl p-4">
                <p className="text-xs text-primary-600 font-medium mb-1">Primary Focus</p>
                <p className="text-sm text-calm-700">Fear and Abandonment emotions are most prevalent. RTT regression work around safety and attachment themes recommended.</p>
              </div>
              <div className="bg-white/80 rounded-xl p-4">
                <p className="text-xs text-teal-600 font-medium mb-1">Secondary Work</p>
                <p className="text-sm text-calm-700">Shame patterns suggest deep self-worth work needed. Consider focused self-worth transformation protocols.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
