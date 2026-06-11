import { motion } from 'framer-motion';
import { Calendar, Brain, Heart, Moon, Clock, ChevronRight, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import RTTSidebar from '../../components/dashboard/RTTSidebar';
import { mockSessionPreparation } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const moodChartData = mockSessionPreparation.recentMood.lastWeek.map((v, i) => ({ day: dayLabels[i], value: v }));
const sleepChartData = mockSessionPreparation.recentSleep.lastWeek.map((v, i) => ({ day: dayLabels[i], value: v }));

export default function RTTSessionPrepPage() {
  const prep = mockSessionPreparation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50 to-teal-50">
      <RTTSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-calm-900">Session Preparation</h1>
              <p className="text-calm-500 mt-1">AI-generated brief for your next RTT session</p>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-calm-100">
              <Calendar size={16} className="text-teal-600" />
              <span className="text-sm font-medium text-calm-800">{prep.client.nextSessionDate} at 10:00 AM</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Client Overview */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-teal-600 to-primary-700 rounded-2xl p-6 text-white shadow-sm">
              <div className="flex items-center gap-4 mb-5">
                <img src={prep.client.avatar} alt={prep.client.name} className="w-16 h-16 rounded-xl object-cover border-2 border-white/20" />
                <div>
                  <h2 className="text-xl font-bold">{prep.client.name}</h2>
                  <p className="text-teal-200 text-sm">{prep.client.sessionsCompleted} sessions completed</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-xs text-teal-200">Next Session</p>
                  <p className="text-sm font-semibold">{prep.client.nextSessionDate}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-xs text-teal-200">Progress</p>
                  <p className="text-sm font-semibold">{prep.client.sessionsCompleted * 20}% complete</p>
                </div>
              </div>
            </motion.div>

            {/* Dominant Belief */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Brain size={18} className="text-primary-600" />
                <h3 className="font-bold text-calm-900">Dominant Belief</h3>
              </div>
              <p className="text-lg font-bold text-calm-900 mb-2">"{prep.dominantBelief.text}"</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                  {prep.dominantBelief.confidence}% confidence
                </span>
              </div>
              <div className="p-3 bg-primary-50 rounded-xl">
                <p className="text-xs text-primary-600 mb-2">Related Emotions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {prep.dominantBelief.relatedEmotions.map((e) => (
                    <span key={e} className="text-xs bg-white text-calm-700 px-2 py-0.5 rounded-full">{e}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Possible Root */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target size={18} className="text-warning-600" />
                <h3 className="font-bold text-calm-900">Possible Root Cause</h3>
              </div>
              <p className="text-lg font-semibold text-calm-800 mb-2">{prep.possibleRoot.text}</p>
              <p className="text-sm text-calm-600 mb-3">{prep.possibleRoot.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded-full">
                  {prep.possibleRoot.confidence}% match
                </span>
              </div>
            </motion.div>

            {/* Triggers */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Heart size={18} className="text-error-500" />
                <h3 className="font-bold text-calm-900">Current Triggers</h3>
              </div>
              <div className="space-y-3">
                {prep.triggers.map((trigger) => (
                  <div key={trigger} className="flex items-center gap-3 p-3 bg-calm-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-error-400" />
                    <span className="text-sm text-calm-700">{trigger}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Mood */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Heart size={18} className="text-primary-600" />
                  <h3 className="font-bold text-calm-900">Recent Mood</h3>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  prep.recentMood.trend === 'Improving' ? 'bg-success-100 text-success-700' : 'bg-calm-100 text-calm-600'
                }`}>
                  {prep.recentMood.trend}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-bold text-calm-900">{prep.recentMood.average}</span>
                <span className="text-xs text-calm-500">avg score</span>
              </div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={moodChartData}>
                  <XAxis dataKey="day" tick={false} />
                  <YAxis domain={[0, 10]} tick={false} />
                  <Tooltip content={({ active, payload }) => active && payload?.length ? (
                    <div className="bg-white border border-calm-200 rounded px-2 py-1 text-xs">{payload[0].value}</div>
                  ) : null} />
                  <Line type="monotone" dataKey="value" stroke="#3b97f3" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Sleep */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Moon size={18} className="text-teal-600" />
                  <h3 className="font-bold text-calm-900">Recent Sleep</h3>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  prep.recentSleep.trend === 'Improving' ? 'bg-success-100 text-success-700' :
                  prep.recentSleep.trend === 'Stable' ? 'bg-calm-100 text-calm-600' : 'bg-warning-100 text-warning-700'
                }`}>
                  {prep.recentSleep.trend}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-bold text-calm-900">{prep.recentSleep.average}</span>
                <span className="text-xs text-calm-500">hrs avg</span>
              </div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={sleepChartData}>
                  <XAxis dataKey="day" tick={false} />
                  <YAxis domain={[0, 10]} tick={false} />
                  <Tooltip content={({ active, payload }) => active && payload?.length ? (
                    <div className="bg-white border border-calm-200 rounded px-2 py-1 text-xs">{payload[0].value} hrs</div>
                  ) : null} />
                  <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Journal Summary */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={18} className="text-teal-600" />
                <h3 className="font-bold text-calm-900">Journal Summary</h3>
              </div>
              <p className="text-sm text-calm-600 leading-relaxed">{prep.journalSummary}</p>
            </motion.div>

            {/* Recommended Focus */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-primary-50 to-teal-50 rounded-2xl border border-primary-200 p-6 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Target size={18} className="text-primary-600" />
                <h3 className="font-bold text-calm-900">Session Focus Recommendation</h3>
              </div>
              <p className="text-sm text-primary-800 leading-relaxed">{prep.recommendedFocus}</p>
              <div className="mt-4 flex gap-3">
                <Link to="/rtt/post-session" className="btn-primary text-sm flex items-center gap-2">
                  Start Session <ChevronRight size={14} />
                </Link>
                <Link to="/rtt/beliefs" className="btn-secondary text-sm">
                  View Belief Details
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
