import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TriangleAlert as AlertTriangle, Clock, ChevronRight, ListFilter as Filter, Brain } from 'lucide-react';
import TherapistSidebar from '../../components/dashboard/TherapistSidebar';
import { mockRiskAlerts, mockTherapistPatients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const riskLevels = ['All', 'Critical', 'High', 'Medium', 'Low'];

export default function TherapistRiskPage() {
  const [filter, setFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  const filteredAlerts = mockRiskAlerts.filter((alert) => {
    const matchSeverity = severityFilter === 'All' || alert.type === severityFilter;
    return matchSeverity;
  });

  const criticalCount = mockRiskAlerts.filter(a => a.type === 'Critical').length;
  const highCount = mockRiskAlerts.filter(a => a.type === 'High').length;
  const mediumCount = mockRiskAlerts.filter(a => a.type === 'Medium').length;

  return (
    <div className="min-h-screen bg-calm-50">
      <TherapistSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">Risk Detection & Alerts</h1>
            <p className="text-calm-500 mt-1">AI-powered risk identification for patient safety</p>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={fadeInUp} className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Brain size={18} className="text-warning-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-warning-800">
                AI provides support insights, not medical diagnosis. All risk assessments should be validated through clinical evaluation.
                In case of imminent danger, follow standard emergency protocols.
              </p>
            </div>
          </motion.div>

          {/* Risk Summary Cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-4 gap-4 mb-6">
            <motion.div variants={fadeInUp} className="card bg-error-50 border-error-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-error-100 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-error-600" />
                </div>
                <div>
                  <p className="text-xs text-error-600">Critical</p>
                  <p className="text-2xl font-bold text-error-700">{criticalCount}</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="card bg-warning-50 border-warning-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning-100 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-warning-600" />
                </div>
                <div>
                  <p className="text-xs text-warning-600">High</p>
                  <p className="text-2xl font-bold text-warning-700">{highCount}</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="card bg-primary-50 border-primary-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-primary-600">Medium</p>
                  <p className="text-2xl font-bold text-primary-700">{mediumCount}</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="card bg-success-50 border-success-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-success-600" />
                </div>
                <div>
                  <p className="text-xs text-success-600">Resolved</p>
                  <p className="text-2xl font-bold text-success-700">12</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeInUp} className="flex gap-2 mb-6">
            <div className="flex gap-2">
              {riskLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSeverityFilter(level)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    severityFilter === level
                      ? level === 'Critical' ? 'bg-error-600 text-white' :
                        level === 'High' ? 'bg-warning-500 text-white' :
                        level === 'Medium' ? 'bg-primary-600 text-white' :
                        level === 'Low' ? 'bg-success-600 text-white' :
                        'bg-calm-800 text-white'
                      : 'bg-white text-calm-600 border border-calm-200 hover:border-primary-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Alerts List */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
            {filteredAlerts.map((alert) => (
              <motion.div key={alert.id} variants={fadeInUp}>
                <div className={`card ${
                  alert.type === 'Critical' ? 'border-error-400 bg-error-50' :
                  alert.type === 'High' ? 'border-warning-300 bg-warning-50' :
                  'border-primary-200 bg-primary-50'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      alert.type === 'Critical' ? 'bg-error-200' :
                      alert.type === 'High' ? 'bg-warning-200' :
                      'bg-primary-200'
                    }`}>
                      <AlertTriangle size={24} className={
                        alert.type === 'Critical' ? 'text-error-600' :
                        alert.type === 'High' ? 'text-warning-600' :
                        'text-primary-600'
                      } />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-calm-900">{alert.title}</p>
                          <p className="text-sm text-calm-600 mt-1">{alert.patientName}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            alert.type === 'Critical' ? 'bg-error-200 text-error-700' :
                            alert.type === 'High' ? 'bg-warning-200 text-warning-700' :
                            'bg-primary-200 text-primary-700'
                          }`}>
                            {alert.type} Priority
                          </span>
                          <div className="flex items-center gap-1 text-xs text-calm-400 mt-2">
                            <Clock size={12} />
                            {alert.timestamp}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-calm-600 mt-3">{alert.description}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-calm-200">
                        <div className="text-sm">
                          <span className="text-calm-500">Recommendation: </span>
                          <span className="font-medium text-calm-800">{alert.recommendation}</span>
                        </div>
                        <Link
                          to={`/therapist/patients/${alert.patientId}`}
                          className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          View Patient <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Patient Risk Classification */}
          <motion.div variants={fadeInUp} className="mt-8">
            <h2 className="text-lg font-bold text-calm-900 mb-4">Patient Risk Classification</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="card">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-error-500" />
                  <span className="font-semibold text-calm-800">Critical</span>
                </div>
                <div className="space-y-2">
                  {mockTherapistPatients.filter(p => p.riskLevel === 'Critical').map(p => (
                    <Link key={p.id} to={`/therapist/patients/${p.id}`} className="flex items-center gap-2 text-sm text-calm-600 hover:text-primary-600">
                      <div className="w-2 h-2 rounded-full bg-error-500" />
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-warning-500" />
                  <span className="font-semibold text-calm-800">High</span>
                </div>
                <div className="space-y-2">
                  {mockTherapistPatients.filter(p => p.riskLevel === 'High').map(p => (
                    <Link key={p.id} to={`/therapist/patients/${p.id}`} className="flex items-center gap-2 text-sm text-calm-600 hover:text-primary-600">
                      <div className="w-2 h-2 rounded-full bg-warning-500" />
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                  <span className="font-semibold text-calm-800">Medium</span>
                </div>
                <div className="space-y-2">
                  {mockTherapistPatients.filter(p => p.riskLevel === 'Medium').map(p => (
                    <Link key={p.id} to={`/therapist/patients/${p.id}`} className="flex items-center gap-2 text-sm text-calm-600 hover:text-primary-600">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-success-500" />
                  <span className="font-semibold text-calm-800">Low</span>
                </div>
                <div className="space-y-2">
                  {mockTherapistPatients.filter(p => p.riskLevel === 'Low').map(p => (
                    <Link key={p.id} to={`/therapist/patients/${p.id}`} className="flex items-center gap-2 text-sm text-calm-600 hover:text-primary-600">
                      <div className="w-2 h-2 rounded-full bg-success-500" />
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
