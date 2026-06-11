import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, TrendingUp, Heart, Moon, Zap, Target, Calendar, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import TherapistSidebar from '../../components/dashboard/TherapistSidebar';
import { mockTherapistPatients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const monthlyProgress = [
  { month: 'Jan', mood: 5.2, stress: 7.1, sleep: 5.5, energy: 4.8 },
  { month: 'Feb', mood: 5.5, stress: 6.8, sleep: 5.8, energy: 5.1 },
  { month: 'Mar', mood: 5.8, stress: 6.4, sleep: 6.1, energy: 5.4 },
  { month: 'Apr', mood: 6.2, stress: 5.9, sleep: 6.4, energy: 5.8 },
  { month: 'May', mood: 6.6, stress: 5.5, sleep: 6.8, energy: 6.2 },
  { month: 'Jun', mood: 7.1, stress: 4.9, sleep: 7.2, energy: 6.8 },
];

const goalsAchieved = [
  { goal: 'Daily mood logging', achieved: 89 },
  { goal: 'Journal entries', achieved: 76 },
  { goal: 'Breathing exercises', achieved: 82 },
  { goal: 'Session attendance', achieved: 94 },
  { goal: 'Homework completion', achieved: 68 },
];

export default function TherapistReportsPage() {
  const [selectedPatient, setSelectedPatient] = useState(mockTherapistPatients[0]);
  const [reportPeriod, setReportPeriod] = useState<'monthly' | 'quarterly'>('monthly');

  return (
    <div className="min-h-screen bg-calm-50">
      <TherapistSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-calm-900">Patient Reports</h1>
              <p className="text-calm-500 mt-1">Generate comprehensive progress reports</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => window.print()} className="btn-secondary flex items-center gap-2">
                <Printer size={16} /> Print
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Download size={16} /> Export PDF
              </button>
            </div>
          </motion.div>

          {/* Patient Selector & Period */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-4 mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-calm-500">Patient:</span>
              <select
                value={selectedPatient.id}
                onChange={(e) => setSelectedPatient(mockTherapistPatients.find(p => p.id === e.target.value) || mockTherapistPatients[0])}
                className="input-field py-2 text-sm w-48"
              >
                {mockTherapistPatients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setReportPeriod('monthly')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  reportPeriod === 'monthly' ? 'bg-primary-600 text-white' : 'bg-calm-100 text-calm-600'
                }`}
              >
                Monthly Report
              </button>
              <button
                onClick={() => setReportPeriod('quarterly')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  reportPeriod === 'quarterly' ? 'bg-primary-600 text-white' : 'bg-calm-100 text-calm-600'
                }`}
              >
                Quarterly Report
              </button>
            </div>
          </motion.div>

          {/* Report Preview - Styled like a PDF document */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-200 shadow-lg p-8 print:shadow-none">
            {/* Report Header */}
            <div className="border-b-2 border-primary-600 pb-6 mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-calm-900">Therapy Progress Report</h2>
                  <p className="text-sm text-calm-500 mt-1">Confidential - For Clinical Use Only</p>
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold mb-2">
                    T
                  </div>
                  <p className="text-sm font-semibold text-calm-700">Therapino</p>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="flex items-start gap-6 mb-8 pb-6 border-b border-calm-100">
              <img src={selectedPatient.avatar} alt={selectedPatient.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-calm-900">{selectedPatient.name}</h3>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-calm-500">Condition</p>
                    <p className="text-sm font-medium text-calm-800">{selectedPatient.condition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-calm-500">Sessions Completed</p>
                    <p className="text-sm font-medium text-calm-800">{selectedPatient.sessionsCompleted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-calm-500">Report Period</p>
                    <p className="text-sm font-medium text-calm-800">June 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scores Summary */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={16} className="text-primary-600" />
                  <span className="text-xs text-calm-500">Mood Score</span>
                </div>
                <p className="text-2xl font-bold text-primary-700">7.1/10</p>
                <p className="text-xs text-success-600 mt-1">+37% from baseline</p>
              </div>
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                <div className="flex items-center gap-2 mb-2">
                  <Moon size={16} className="text-teal-600" />
                  <span className="text-xs text-calm-500">Sleep Score</span>
                </div>
                <p className="text-2xl font-bold text-teal-700">7.2/10</p>
                <p className="text-xs text-success-600 mt-1">+31% from baseline</p>
              </div>
              <div className="p-4 bg-warning-50 rounded-xl border border-warning-100">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={16} className="text-warning-600" />
                  <span className="text-xs text-calm-500">Stress Level</span>
                </div>
                <p className="text-2xl font-bold text-warning-700">4.9/10</p>
                <p className="text-xs text-success-600 mt-1">-31% from baseline</p>
              </div>
              <div className="p-4 bg-success-50 rounded-xl border border-success-100">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={16} className="text-success-600" />
                  <span className="text-xs text-calm-500">Energy Level</span>
                </div>
                <p className="text-2xl font-bold text-success-700">6.8/10</p>
                <p className="text-xs text-success-600 mt-1">+42% from baseline</p>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="mb-8">
              <h4 className="font-bold text-calm-900 mb-4">Monthly Progress Trend</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#3b97f3" strokeWidth={2} name="Mood" />
                  <Line type="monotone" dataKey="energy" stroke="#22c55e" strokeWidth={2} name="Energy" />
                  <Line type="monotone" dataKey="sleep" stroke="#14b8a6" strokeWidth={2} name="Sleep" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Goals Achievement */}
            <div className="mb-8">
              <h4 className="font-bold text-calm-900 mb-4">Goals Achievement Rate</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={goalsAchieved} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis type="category" dataKey="goal" tick={{ fontSize: 11, fill: '#64748b' }} width={120} />
                  <Tooltip />
                  <Bar dataKey="achieved" fill="#3b97f3" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary */}
            <div className="bg-calm-50 rounded-xl p-6 mb-8">
              <h4 className="font-bold text-calm-900 mb-3">Clinical Summary</h4>
              <p className="text-sm text-calm-700 leading-relaxed">
                {selectedPatient.name} has shown significant improvement across all measured metrics over the reporting period.
                Mood scores have increased by 37%, with a corresponding 31% reduction in reported stress levels.
                Sleep quality has improved markedly, indicating better overall emotional regulation.
                The patient has demonstrated strong commitment to therapeutic exercises, with an overall homework completion rate of 82%.
                Journal entries indicate growing self-awareness and improved coping mechanisms for work-related triggers.
              </p>
            </div>

            {/* Recommendations */}
            <div className="border-t border-calm-100 pt-6">
              <h4 className="font-bold text-calm-900 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-calm-700">
                  <TrendingUp size={14} className="text-success-500 mt-0.5 flex-shrink-0" />
                  Continue current therapeutic approach with emphasis on self-worth reframing
                </li>
                <li className="flex items-start gap-2 text-sm text-calm-700">
                  <TrendingUp size={14} className="text-success-500 mt-0.5 flex-shrink-0" />
                  Consider reducing session frequency from weekly to bi-weekly given strong progress
                </li>
                <li className="flex items-start gap-2 text-sm text-calm-700">
                  <TrendingUp size={14} className="text-success-500 mt-0.5 flex-shrink-0" />
                  Maintain monitoring of work-related stress triggers
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-calm-100 mt-8 pt-6 flex items-center justify-between text-xs text-calm-500">
              <div>
                <p>Report generated by Therapino Therapist Platform</p>
                <p>Date: June 20, 2024</p>
              </div>
              <div className="text-right">
                <p>Dr. Sarah Mitchell</p>
                <p>Clinical Psychologist</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
