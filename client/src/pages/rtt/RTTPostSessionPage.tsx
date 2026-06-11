import { motion } from 'framer-motion';
import { Sparkles, Heart, BookOpen, Wind, CircleCheck as CheckCircle, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import RTTSidebar from '../../components/dashboard/RTTSidebar';
import { mockPostSessionIntegration } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function RTTPostSessionPage() {
  const integration = mockPostSessionIntegration[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50 to-teal-50">
      <RTTSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">Post-Session Integration</h1>
            <p className="text-calm-500 mt-1">Resources and exercises to reinforce session breakthroughs</p>
          </motion.div>

          {/* Session Summary */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-teal-600 to-primary-700 rounded-2xl p-6 text-white mb-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-teal-200 mb-2">
                  <Calendar size={14} />
                  <span className="text-sm">{integration.sessionDate}</span>
                </div>
                <h2 className="text-xl font-bold">{integration.sessionTopic}</h2>
                <p className="text-teal-200 text-sm mt-1">{integration.clientName}</p>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2">
                <p className="text-2xl font-bold">{integration.homework.progress}%</p>
                <p className="text-xs text-teal-200">Homework Complete</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-teal-200 mb-2">Breakthrough Areas:</p>
              <div className="flex flex-wrap gap-2">
                {integration.breakthroughs.map((b) => (
                  <span key={b} className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full">{b}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Daily Affirmations */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-warning-500" />
                <h3 className="font-bold text-calm-900">Daily Affirmations</h3>
              </div>
              <div className="space-y-3">
                {integration.affirmations.map((affirmation, i) => (
                  <div key={i} className="p-4 bg-warning-50 rounded-xl border border-warning-100">
                    <p className="text-sm text-warning-800 italic font-medium">"{affirmation}"</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Journal Prompts */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={18} className="text-primary-600" />
                <h3 className="font-bold text-calm-900">Journaling Prompts</h3>
              </div>
              <div className="space-y-3">
                {integration.journalPrompts.map((prompt, i) => (
                  <div key={i} className="p-4 bg-primary-50 rounded-xl border border-primary-100">
                    <p className="text-sm text-primary-800">{prompt}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Exercises */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Wind size={18} className="text-teal-600" />
                <h3 className="font-bold text-calm-900">Daily Exercises</h3>
              </div>
              <div className="space-y-3">
                {integration.exercises.map((exercise, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                    <CheckCircle size={16} className="text-teal-500" />
                    <span className="text-sm text-teal-800">{exercise}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Homework Tracking */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-primary-600" />
                <h3 className="font-bold text-calm-900">Homework Tracking</h3>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold text-calm-900 mb-3">{integration.homework.title}</p>
                <div className="space-y-2">
                  {integration.homework.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border-2 border-primary-300 flex items-center justify-center">
                        {i < Math.round(integration.homework.progress / 100 * integration.homework.tasks.length) && (
                          <CheckCircle size={14} className="text-primary-600" />
                        )}
                      </div>
                      <span className="text-sm text-calm-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-calm-50 rounded-xl">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-calm-600">Progress</span>
                  <span className="font-medium text-primary-600">{integration.homework.progress}%</span>
                </div>
                <div className="h-2 bg-calm-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: `${integration.homework.progress}%` }} />
                </div>
                <p className="text-xs text-calm-500 mt-2">Due: {integration.homework.dueDate}</p>
              </div>
            </motion.div>
          </div>

          {/* Audio Programs Recommendation */}
          <motion.div variants={fadeInUp} className="mt-6 bg-gradient-to-br from-primary-50 to-teal-50 rounded-2xl border border-primary-200 p-6">
            <h3 className="font-bold text-calm-900 mb-4">Recommended RTT Audio Programs</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/rtt/audio" className="p-4 bg-white rounded-xl border border-calm-100 hover:shadow-md transition-all">
                <p className="font-semibold text-calm-800">Self-Worth Transformation</p>
                <p className="text-xs text-calm-500 mt-1">25 min daily listening</p>
              </Link>
              <Link to="/rtt/audio" className="p-4 bg-white rounded-xl border border-calm-100 hover:shadow-md transition-all">
                <p className="font-semibold text-calm-800">Deep Confidence</p>
                <p className="text-xs text-calm-500 mt-1">20 min reinforcement</p>
              </Link>
              <Link to="/rtt/audio" className="p-4 bg-white rounded-xl border border-calm-100 hover:shadow-md transition-all">
                <p className="font-semibold text-calm-800">Sleep Integration</p>
                <p className="text-xs text-calm-500 mt-1">Play before rest</p>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
