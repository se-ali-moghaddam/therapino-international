import { motion } from 'framer-motion';
import { FileText, Download, ChartBar as BarChart2, Star, TrendingUp, Users, Calendar, Target, Brain, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import RTTSidebar from '../../components/dashboard/RTTSidebar';
import { mockRTTClients, rttPractitionerStats } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const clientProgress = [
  { month: 'Jan', selfWorth: 35, confidence: 28, anxiety: 42 },
  { month: 'Feb', selfWorth: 42, confidence: 35, anxiety: 38 },
  { month: 'Mar', selfWorth: 55, confidence: 48, anxiety: 32 },
  { month: 'Apr', selfWorth: 68, confidence: 62, anxiety: 25 },
  { month: 'May', selfWorth: 78, confidence: 72, anxiety: 18 },
  { month: 'Jun', selfWorth: 88, confidence: 85, anxiety: 12 },
];

const successRate = [
  { category: 'Anxiety Relief', achieved: 88 },
  { category: 'Self-Worth', achieved: 92 },
  { category: 'Confidence', achieved: 89 },
  { category: 'Sleep', achieved: 76 },
  { category: 'Relationships', achieved: 71 },
  { category: 'Stress', achieved: 85 },
];

export default function RTTReportsPage() {
  const selectedClient = mockRTTClients[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50 to-teal-50">
      <RTTSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-calm-900">RTT Reports</h1>
              <p className="text-calm-500 mt-1">Comprehensive transformation outcome reports</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-2 text-sm">
                <Calendar size={16} /> Select Period
              </button>
              <button className="btn-teal flex items-center gap-2">
                <Download size={16} /> Export PDF
              </button>
            </div>
          </motion.div>

          {/* Report Summary */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-teal-600 to-primary-700 rounded-2xl p-6 text-white mb-6 shadow-sm">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-teal-200 text-sm mb-1">Total Transformations</p>
                <p className="text-4xl font-bold">{rttPractitionerStats.sessionsCompleted}</p>
                <p className="text-teal-200 text-xs mt-1">RTT sessions completed</p>
              </div>
              <div>
                <p className="text-teal-200 text-sm mb-1">Success Rate</p>
                <p className="text-4xl font-bold">{rttPractitionerStats.improvementRate}%</p>
                <p className="text-teal-200 text-xs mt-1">Positive outcomes achieved</p>
              </div>
              <div>
                <p className="text-teal-200 text-sm mb-1">Client Satisfaction</p>
                <p className="text-4xl font-bold">{rttPractitionerStats.clientSatisfaction}%</p>
                <p className="text-teal-200 text-xs mt-1">Average feedback rating</p>
              </div>
            </div>
          </motion.div>

          {/* Client Selector */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-4 mb-6 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="text-sm text-calm-600">Select Client:</span>
              <select className="input-field py-2 text-sm w-64">
                {mockRTTClients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Detailed Report */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-200 shadow-lg p-8 mb-6">
            {/* Header */}
            <div className="border-b border-calm-200 pb-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-primary-500 rounded-xl flex items-center justify-center text-white font-bold">
                      RTT
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-calm-900">RTT Transformation Report</h2>
                      <p className="text-xs text-calm-500">Confidential Clinical Report</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-calm-700">Report Period</p>
                  <p className="text-xs text-calm-500">January - June 2024</p>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-calm-100">
              <img src={selectedClient.avatar} alt={selectedClient.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-calm-900">{selectedClient.name}</h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-calm-500">Sessions</p>
                    <p className="text-sm font-medium">{selectedClient.sessionsCompleted}/{selectedClient.totalSessions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-calm-500">Progress</p>
                    <p className="text-sm font-medium text-teal-600">{selectedClient.progress}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-calm-500">Status</p>
                    <p className="text-sm font-medium">{selectedClient.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Outcome Scores */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                <div className="flex items-center gap-2 mb-2"><Brain size={14} className="text-teal-600" /><span className="text-xs text-calm-500">Belief Transform</span></div>
                <p className="text-xl font-bold text-teal-700">92%</p>
              </div>
              <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
                <div className="flex items-center gap-2 mb-2"><Heart size={14} className="text-primary-600" /><span className="text-xs text-calm-500">Self-Worth</span></div>
                <p className="text-xl font-bold text-primary-700">88%</p>
              </div>
              <div className="p-4 bg-warning-50 rounded-xl border border-warning-100">
                <div className="flex items-center gap-2 mb-2"><Star size={14} className="text-warning-600" /><span className="text-xs text-calm-500">Anxiety Relief</span></div>
                <p className="text-xl font-bold text-warning-700">85%</p>
              </div>
              <div className="p-4 bg-success-50 rounded-xl border border-success-100">
                <div className="flex items-center gap-2 mb-2"><Target size={14} className="text-success-600" /><span className="text-xs text-calm-500">Overall</span></div>
                <p className="text-xl font-bold text-success-700">{selectedClient.progress}%</p>
              </div>
            </div>

            {/* Progress Over Time */}
            <div className="mb-6">
              <h4 className="font-bold text-calm-900 mb-4">Transformation Journey</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={clientProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="selfWorth" stroke="#14b8a6" name="Self-Worth" />
                  <Line type="monotone" dataKey="confidence" stroke="#3b97f3" name="Confidence" />
                  <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" name="Anxiety Relief" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recommendations */}
            <div className="bg-calm-50 rounded-xl p-4">
              <h4 className="font-bold text-calm-900 mb-2">RTT Recommendations</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-calm-700"><TrendingUp size={14} className="text-success-500 mt-0.5" />Continue reinforcement with daily audio programs</li>
                <li className="flex items-start gap-2 text-sm text-calm-700"><TrendingUp size={14} className="text-success-500 mt-0.5" />Strong progress - consider graduation from intensive therapy</li>
                <li className="flex items-start gap-2 text-sm text-calm-700"><TrendingUp size={14} className="text-success-500 mt-0.5" />Schedule follow-up check-ins at 30-day intervals</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-calm-100 flex items-center justify-between text-xs text-calm-500">
              <p>Generated by Therapino RTT Platform</p>
              <p>Report Date: June 20, 2024</p>
            </div>
          </motion.div>

          {/* Success Rates */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
            <h3 className="font-bold text-calm-900 mb-4">Outcome Success Rates (All Clients)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {successRate.map((item) => (
                <div key={item.category} className="p-4 bg-calm-50 rounded-xl border border-calm-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-calm-700">{item.category}</span>
                    <span className="font-bold text-teal-600">{item.achieved}%</span>
                  </div>
                  <div className="h-2 bg-calm-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${item.achieved}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
