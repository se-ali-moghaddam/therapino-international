import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, TriangleAlert as AlertTriangle, Moon, Zap, Calendar } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import TherapistSidebar from '../../components/dashboard/TherapistSidebar';
import { mockPatientTimelineData } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function TherapistTimelinePage() {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>('7days');
  const [selectedPatient, setSelectedPatient] = useState('Sarah Mitchell');

  const data = mockPatientTimelineData[timeRange];

  const patients = ['Sarah Mitchell', 'John Parker', 'Emma Wilson', 'Sophia Reed', 'Michael Chen'];

  return (
    <div className="min-h-screen bg-calm-50">
      <TherapistSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">Patient Timeline</h1>
            <p className="text-calm-500 mt-1">Multi-metric view of patient progress over time</p>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-4 mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-calm-400" />
              <span className="text-sm text-calm-600">Patient:</span>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="input-field py-2 text-sm w-48"
              >
                {patients.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 ml-auto">
              {(['7days', '30days', '90days'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    timeRange === range ? 'bg-primary-600 text-white' : 'bg-calm-100 text-calm-600 hover:bg-calm-200'
                  }`}
                >
                  {range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main Multi-Line Chart */}
          <motion.div variants={fadeInUp} className="card mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-calm-900">Multi-Metric Timeline</h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                  <span className="text-calm-600">Mood</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-warning-500" />
                  <span className="text-calm-600">Anxiety</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-error-500" />
                  <span className="text-calm-600">Stress</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                  <span className="text-calm-600">Sleep</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-success-500" />
                  <span className="text-calm-600">Energy</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.labels.map((label, i) => ({
                label,
                mood: data.mood[i],
                anxiety: data.anxiety[i],
                stress: data.stress[i],
                sleep: data.sleep[i],
                energy: data.energy[i],
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div className="bg-white border border-calm-200 rounded-xl px-4 py-3 text-xs shadow-lg">
                        <p className="font-semibold text-calm-800 mb-2">{label}</p>
                        {payload.map((p: { name: string; value: number; color: string }) => (
                          <div key={p.name} className="flex items-center justify-between gap-4">
                            <span style={{ color: p.color }}>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
                            <span className="font-medium">{p.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
                />
                <Line type="monotone" dataKey="mood" stroke="#3b97f3" strokeWidth={2.5} dot={{ r: 4, fill: '#3b97f3' }} />
                <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: '#f59e0b' }} />
                <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4, fill: '#ef4444' }} />
                <Line type="monotone" dataKey="sleep" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 4, fill: '#14b8a6' }} />
                <Line type="monotone" dataKey="energy" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: '#22c55e' }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Individual Metric Cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Heart size={16} className="text-primary-600" />
                </div>
                <span className="text-sm font-semibold text-calm-800">Mood</span>
              </div>
              <p className="text-3xl font-bold text-primary-600">{data.mood[data.mood.length - 1]}</p>
              <p className="text-xs text-calm-500 mt-1">
                {data.mood[data.mood.length - 1] > data.mood[0] ? '+' : ''}
                {((data.mood[data.mood.length - 1] - data.mood[0]) / data.mood[0] * 100).toFixed(0)}% from start
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-warning-100 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-warning-600" />
                </div>
                <span className="text-sm font-semibold text-calm-800">Anxiety</span>
              </div>
              <p className="text-3xl font-bold text-warning-600">{data.anxiety[data.anxiety.length - 1]}</p>
              <p className="text-xs text-calm-500 mt-1">
                {data.anxiety[data.anxiety.length - 1] < data.anxiety[0] ? '' : '+'}
                {((data.anxiety[data.anxiety.length - 1] - data.anxiety[0]) / data.anxiety[0] * 100).toFixed(0)}% from start
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-error-100 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-error-600" />
                </div>
                <span className="text-sm font-semibold text-calm-800">Stress</span>
              </div>
              <p className="text-3xl font-bold text-error-600">{data.stress[data.stress.length - 1]}</p>
              <p className="text-xs text-calm-500 mt-1">
                {data.stress[data.stress.length - 1] < data.stress[0] ? '' : '+'}
                {((data.stress[data.stress.length - 1] - data.stress[0]) / data.stress[0] * 100).toFixed(0)}% from start
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Moon size={16} className="text-teal-600" />
                </div>
                <span className="text-sm font-semibold text-calm-800">Sleep</span>
              </div>
              <p className="text-3xl font-bold text-teal-600">{data.sleep[data.sleep.length - 1]}</p>
              <p className="text-xs text-calm-500 mt-1">
                {data.sleep[data.sleep.length - 1] > data.sleep[0] ? '+' : ''}
                {((data.sleep[data.sleep.length - 1] - data.sleep[0]) / data.sleep[0] * 100).toFixed(0)}% from start
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-success-100 flex items-center justify-center">
                  <Zap size={16} className="text-success-600" />
                </div>
                <span className="text-sm font-semibold text-calm-800">Energy</span>
              </div>
              <p className="text-3xl font-bold text-success-600">{data.energy[data.energy.length - 1]}</p>
              <p className="text-xs text-calm-500 mt-1">
                {data.energy[data.energy.length - 1] > data.energy[0] ? '+' : ''}
                {((data.energy[data.energy.length - 1] - data.energy[0]) / data.energy[0] * 100).toFixed(0)}% from start
              </p>
            </motion.div>
          </motion.div>

          {/* Summary */}
          <motion.div variants={fadeInUp} className="card mt-6 bg-gradient-to-br from-primary-50 to-teal-50 border-primary-200">
            <h3 className="font-bold text-calm-900 mb-4">Timeline Analysis Summary</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-calm-500 mb-1">Overall Trend</p>
                <p className="text-sm font-semibold text-success-600">Improving</p>
                <p className="text-xs text-calm-500 mt-1">All core metrics showing positive trajectory</p>
              </div>
              <div>
                <p className="text-xs text-calm-500 mb-1">Key Improvement</p>
                <p className="text-sm font-semibold text-primary-700">Anxiety down 43%</p>
                <p className="text-xs text-calm-500 mt-1">Significant reduction in reported anxiety levels</p>
              </div>
              <div>
                <p className="text-xs text-calm-500 mb-1">Area to Monitor</p>
                <p className="text-sm font-semibold text-warning-600">Sleep patterns</p>
                <p className="text-xs text-calm-500 mt-1">Slight fluctuation in sleep quality, continue monitoring</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
