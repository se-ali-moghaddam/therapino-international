import { motion } from 'framer-motion';
import { Brain, TrendingUp, TriangleAlert as AlertTriangle, Moon, Users, Activity, Heart, Lightbulb } from 'lucide-react';
import TherapistSidebar from '../../components/dashboard/TherapistSidebar';
import { mockTherapistPatients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const dominantEmotions = [
  { emotion: 'Anxiety', count: 45, color: '#f59e0b' },
  { emotion: 'Fear', count: 38, color: '#ef4444' },
  { emotion: 'Sadness', count: 32, color: '#3b97f3' },
  { emotion: 'Anger', count: 18, color: '#991b1b' },
  { emotion: 'Guilt', count: 24, color: '#a855f7' },
  { emotion: 'Shame', count: 28, color: '#ec4899' },
];

const stressTriggers = [
  { trigger: 'Work pressure', percentage: 78 },
  { trigger: 'Relationships', percentage: 65 },
  { trigger: 'Financial concerns', percentage: 52 },
  { trigger: 'Health worries', percentage: 45 },
  { trigger: 'Social situations', percentage: 38 },
  { trigger: 'Sleep issues', percentage: 42 },
];

const behavioralPatterns = [
  { pattern: 'Nighttime rumination', description: 'Increased negative thinking patterns reported between 10 PM - 2 AM', severity: 'High' },
  { pattern: 'Social withdrawal', description: 'Decline in social interactions and missed social commitments', severity: 'Medium' },
  { pattern: 'Procrastination spike', description: 'Task avoidance increasing, especially for work-related activities', severity: 'Medium' },
  { pattern: 'Self-care neglect', description: 'Reduced engagement in exercise, healthy eating, and personal care', severity: 'Low' },
];

const sleepIssues = [
  { issue: 'Difficulty falling asleep', affected: '34%', trend: 'Stable' },
  { issue: 'Night wakings', affected: '28%', trend: 'Improving' },
  { issue: 'Early morning awakening', affected: '22%', trend: 'Worsening' },
  { issue: 'Non-restorative sleep', affected: '18%', trend: 'Stable' },
];

export default function TherapistInsightsPage() {
  return (
    <div className="min-h-screen bg-calm-50">
      <TherapistSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">AI Behavioral Insights</h1>
            <p className="text-calm-500 mt-1">AI-generated analysis across all patient interactions</p>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={fadeInUp} className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-warning-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-warning-800">
                AI provides support insights, not medical diagnosis. All patterns should be validated through clinical assessment.
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Dominant Emotions */}
            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Heart size={20} className="text-primary-600" />
                </div>
                <h3 className="font-bold text-calm-900">Dominant Emotions</h3>
              </div>
              <div className="space-y-3">
                {dominantEmotions.map((e) => (
                  <div key={e.emotion}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-calm-700">{e.emotion}</span>
                      <span className="font-medium text-calm-800">{e.count} instances</span>
                    </div>
                    <div className="h-2 bg-calm-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(e.count / 50) * 100}%`, backgroundColor: e.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stress Triggers */}
            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-warning-100 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-warning-600" />
                </div>
                <h3 className="font-bold text-calm-900">Stress Triggers</h3>
              </div>
              <div className="space-y-3">
                {stressTriggers.map((t) => (
                  <div key={t.trigger} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-calm-700">{t.trigger}</span>
                        <span className="font-medium text-calm-800">{t.percentage}%</span>
                      </div>
                      <div className="h-2 bg-calm-100 rounded-full overflow-hidden">
                        <div className="h-full bg-warning-500 rounded-full" style={{ width: `${t.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Behavioral Patterns */}
            <motion.div variants={fadeInUp} className="card lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Activity size={20} className="text-teal-600" />
                </div>
                <h3 className="font-bold text-calm-900">Behavioral Patterns Detected</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {behavioralPatterns.map((p) => (
                  <div key={p.pattern} className="p-4 bg-calm-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-calm-800">{p.pattern}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.severity === 'High' ? 'bg-error-100 text-error-700' :
                        p.severity === 'Medium' ? 'bg-warning-100 text-warning-700' :
                        'bg-success-100 text-success-700'
                      }`}>
                        {p.severity} Impact
                      </span>
                    </div>
                    <p className="text-sm text-calm-600">{p.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sleep Issues */}
            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Moon size={20} className="text-teal-600" />
                </div>
                <h3 className="font-bold text-calm-900">Sleep Issues Identified</h3>
              </div>
              <div className="space-y-3">
                {sleepIssues.map((s) => (
                  <div key={s.issue} className="flex items-center justify-between p-3 bg-calm-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-calm-800">{s.issue}</p>
                      <p className="text-xs text-calm-500">Affected: {s.affected}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      s.trend === 'Improving' ? 'bg-success-100 text-success-700' :
                      s.trend === 'Worsening' ? 'bg-error-100 text-error-700' :
                      'bg-calm-100 text-calm-600'
                    }`}>
                      {s.trend}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Withdrawal */}
            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-error-100 flex items-center justify-center">
                  <Users size={20} className="text-error-600" />
                </div>
                <h3 className="font-bold text-calm-900">Social Isolation Indicators</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-error-50 border border-error-200 rounded-xl">
                  <p className="text-sm font-semibold text-error-800 mb-1">23% of patients showing isolation patterns</p>
                  <p className="text-xs text-error-600">Reduced social interactions, missed social events, decreased communication</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-3 bg-calm-50 rounded-xl">
                    <p className="text-xl font-bold text-calm-900">12</p>
                    <p className="text-xs text-calm-500">Low</p>
                  </div>
                  <div className="text-center p-3 bg-calm-50 rounded-xl">
                    <p className="text-xl font-bold text-warning-600">8</p>
                    <p className="text-xs text-calm-500">Medium</p>
                  </div>
                  <div className="text-center p-3 bg-calm-50 rounded-xl">
                    <p className="text-xl font-bold text-error-600">5</p>
                    <p className="text-xs text-calm-500">High</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div variants={fadeInUp} className="card lg:col-span-2 bg-gradient-to-br from-primary-50 to-teal-50 border-primary-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Lightbulb size={20} className="text-primary-600" />
                </div>
                <h3 className="font-bold text-calm-900">AI Recommendations</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/80 rounded-xl">
                  <p className="text-xs text-primary-600 font-medium mb-1">High Priority</p>
                  <p className="text-sm text-calm-800">Consider scheduling check-ins with 5 patients showing high isolation indicators</p>
                </div>
                <div className="p-4 bg-white/80 rounded-xl">
                  <p className="text-xs text-teal-600 font-medium mb-1">Therapeutic Focus</p>
                  <p className="text-sm text-calm-800">Nighttime rumination patterns suggest CBT sleep interventions may be beneficial</p>
                </div>
                <div className="p-4 bg-white/80 rounded-xl">
                  <p className="text-xs text-success-600 font-medium mb-1">Positive Trend</p>
                  <p className="text-sm text-calm-800">Overall mood improvement of 18% across patient cohort - continue current approaches</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
