import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Activity, TrendingUp, BookOpen, TriangleAlert as AlertTriangle, Brain, Heart, Moon, Zap } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import TherapistSidebar from '../../components/dashboard/TherapistSidebar';
import { mockTherapistPatients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function TherapistPatientProfilePage() {
  const { patientId } = useParams<{ patientId: string }>();
  const patient = mockTherapistPatients.find((p) => p.id === patientId) || mockTherapistPatients[0];
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90'>('7');

  const moodChartData = patient.moodTrend.map((v, i) => ({ day: dayLabels[i], value: v }));
  const stressChartData = patient.stressTrend.map((v, i) => ({ day: dayLabels[i], value: v }));
  const sleepChartData = patient.sleepTrend.map((v, i) => ({ day: dayLabels[i], value: v }));
  const energyChartData = patient.energyTrend.map((v, i) => ({ day: dayLabels[i], value: v }));

  const radarData = [
    { subject: 'Mood', value: patient.moodTrend[6] * 10, fullMark: 100 },
    { subject: 'Sleep', value: patient.sleepTrend[6] * 10, fullMark: 100 },
    { subject: 'Energy', value: patient.energyTrend[6] * 10, fullMark: 100 },
    { subject: 'Low Stress', value: (10 - patient.stressTrend[6]) * 10, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-calm-50">
      <TherapistSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <Link to="/therapist/patients" className="flex items-center gap-2 text-sm text-calm-500 hover:text-calm-800 mb-4 transition-colors">
              <ArrowLeft size={14} /> Back to Patient List
            </Link>

            {/* Patient Header */}
            <div className="bg-white rounded-2xl border border-calm-100 p-6 mb-6">
              <div className="flex items-start gap-5">
                <img src={patient.avatar} alt={patient.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-calm-900">{patient.name}</h1>
                      <p className="text-sm text-calm-500 mt-0.5">Condition: {patient.condition}</p>
                    </div>
                    <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                      patient.riskLevel === 'Critical' ? 'bg-error-100 text-error-700 border border-error-300' :
                      patient.riskLevel === 'High' ? 'bg-warning-100 text-warning-700' :
                      patient.riskLevel === 'Medium' ? 'bg-primary-100 text-primary-700' : 'bg-success-100 text-success-700'
                    }`}>
                      {patient.riskLevel} Risk
                    </span>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm text-calm-500">
                      <Calendar size={14} />
                      <span>Last Session: {patient.lastSession}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-calm-500">
                      <Clock size={14} />
                      <span>Next: {patient.nextSession}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-calm-500">
                      <Activity size={14} />
                      <span>{patient.sessionsCompleted} sessions completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Time Range Selector */}
          <motion.div variants={fadeInUp} className="flex gap-2 mb-6">
            {(['7', '30', '90'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  timeRange === range ? 'bg-primary-600 text-white' : 'bg-white text-calm-600 border border-calm-200 hover:border-primary-300'
                }`}
              >
                {range === '7' ? 'Last 7 Days' : range === '30' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Charts Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mood Trend */}
              <motion.div variants={fadeInUp} className="card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Heart size={20} className="text-primary-600" />
                  </div>
                  <h3 className="font-bold text-calm-900">Mood Trend</h3>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={moodChartData}>
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
                    <Line type="monotone" dataKey="value" stroke="#3b97f3" strokeWidth={2.5} dot={{ r: 4, fill: '#3b97f3' }} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Grid of smaller charts */}
              <div className="grid grid-cols-2 gap-4">
                {/* Stress Level */}
                <motion.div variants={fadeInUp} className="card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-warning-100 flex items-center justify-center">
                      <AlertTriangle size={16} className="text-warning-600" />
                    </div>
                    <h3 className="text-sm font-bold text-calm-900">Stress Level</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={stressChartData}>
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} />
                      <YAxis domain={[0, 10]} tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={25} />
                      <Tooltip
                        content={({ active, payload }) =>
                          active && payload?.length ? (
                            <div className="bg-white border border-calm-200 rounded px-2 py-1 text-xs shadow-sm">
                              {payload[0].value}/10
                            </div>
                          ) : null
                        }
                      />
                      <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Sleep Quality */}
                <motion.div variants={fadeInUp} className="card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Moon size={16} className="text-teal-600" />
                    </div>
                    <h3 className="text-sm font-bold text-calm-900">Sleep Quality</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={sleepChartData}>
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} />
                      <YAxis domain={[0, 10]} tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={25} />
                      <Tooltip
                        content={({ active, payload }) =>
                          active && payload?.length ? (
                            <div className="bg-white border border-calm-200 rounded px-2 py-1 text-xs shadow-sm">
                              {payload[0].value}/10
                            </div>
                          ) : null
                        }
                      />
                      <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3, fill: '#14b8a6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Energy Level */}
                <motion.div variants={fadeInUp} className="card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-success-100 flex items-center justify-center">
                      <Zap size={16} className="text-success-600" />
                    </div>
                    <h3 className="text-sm font-bold text-calm-900">Energy Level</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={energyChartData}>
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} />
                      <YAxis domain={[0, 10]} tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={25} />
                      <Tooltip
                        content={({ active, payload }) =>
                          active && payload?.length ? (
                            <div className="bg-white border border-calm-200 rounded px-2 py-1 text-xs shadow-sm">
                              {payload[0].value}/10
                            </div>
                          ) : null
                        }
                      />
                      <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: '#22c55e' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Journal Activity */}
                <motion.div variants={fadeInUp} className="card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                      <BookOpen size={16} className="text-primary-600" />
                    </div>
                    <h3 className="text-sm font-bold text-calm-900">Journal Activity</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-calm-900">{patient.journalEntries}</p>
                      <p className="text-xs text-calm-500">entries this month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-calm-400">Last entry</p>
                      <p className="text-sm font-medium text-calm-700">{patient.lastJournalDate}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* AI Summary Column */}
            <div className="space-y-6">
              {/* Wellness Radar */}
              <motion.div variants={fadeInUp} className="card">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={16} className="text-primary-600" />
                  <h3 className="text-sm font-bold text-calm-900">Wellness Profile</h3>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Radar name="Score" dataKey="value" stroke="#3b97f3" fill="#3b97f3" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* AI Clinical Summary */}
              <motion.div variants={fadeInUp} className="card bg-gradient-to-br from-primary-50 to-teal-50 border-primary-200">
                <div className="flex items-center gap-2 mb-4">
                  <Brain size={18} className="text-primary-600" />
                  <h3 className="font-bold text-calm-900">AI Clinical Summary</h3>
                  <span className="ml-auto text-xs text-calm-400 italic">Generated</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-calm-500 mb-1">Primary Issue</p>
                    <p className="text-sm font-semibold text-calm-800">{patient.aiSummary.primaryIssue}</p>
                  </div>

                  <div>
                    <p className="text-xs text-calm-500 mb-1">Core Belief</p>
                    <p className="text-sm font-medium text-primary-700 italic">"{patient.aiSummary.coreBelief}"</p>
                  </div>

                  <div>
                    <p className="text-xs text-calm-500 mb-1">Triggers</p>
                    <div className="flex flex-wrap gap-1.5">
                      {patient.aiSummary.triggers.map((t) => (
                        <span key={t} className="text-xs bg-white text-calm-700 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-calm-500 mb-1">Trend</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} className={patient.progress > 0 ? 'text-success-500' : 'text-error-500'} />
                      <span className={`text-sm font-medium ${patient.progress > 0 ? 'text-success-600' : 'text-error-600'}`}>
                        {patient.aiSummary.trend}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-calm-500 mb-1">Dominant Emotions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {patient.aiSummary.dominantEmotions.map((e) => (
                        <span key={e} className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">{e}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-primary-200">
                  <p className="text-xs text-calm-500 italic">
                    AI provides support insights, not medical diagnosis. Always use clinical judgment.
                  </p>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={fadeInUp} className="card">
                <h3 className="font-bold text-calm-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/therapist/notes" className="block w-full p-3 bg-calm-50 rounded-xl text-sm text-calm-700 hover:bg-primary-50 hover:text-primary-700 transition-all">
                    View Session Notes
                  </Link>
                  <Link to="/therapist/assignments" className="block w-full p-3 bg-calm-50 rounded-xl text-sm text-calm-700 hover:bg-primary-50 hover:text-primary-700 transition-all">
                    Assign Exercises
                  </Link>
                  <Link to="/therapist/reports" className="block w-full p-3 bg-calm-50 rounded-xl text-sm text-calm-700 hover:bg-primary-50 hover:text-primary-700 transition-all">
                    Generate Report
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
