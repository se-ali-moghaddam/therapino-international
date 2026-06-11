import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ListFilter as Filter, ChevronDown, ChevronRight, TriangleAlert as AlertTriangle, Clock, Activity, TrendingUp } from 'lucide-react';
import TherapistSidebar from '../../components/dashboard/TherapistSidebar';
import { mockTherapistPatients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const riskColors = {
  Low: 'bg-success-100 text-success-700',
  Medium: 'bg-primary-100 text-primary-700',
  High: 'bg-warning-100 text-warning-700',
  Critical: 'bg-error-100 text-error-700 border border-error-300',
};

export default function TherapistPatientsPage() {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [conditionFilter, setConditionFilter] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredPatients = mockTherapistPatients.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === 'All' || p.riskLevel === riskFilter;
    const matchCondition = conditionFilter === 'All' || p.condition === conditionFilter;
    return matchSearch && matchRisk && matchCondition;
  });

  const criticalCount = mockTherapistPatients.filter(p => p.riskLevel === 'Critical').length;
  const highCount = mockTherapistPatients.filter(p => p.riskLevel === 'High').length;

  return (
    <div className="min-h-screen bg-calm-50">
      <TherapistSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-6">
          <motion.div variants={fadeInUp} className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-calm-900">Patient List</h1>
              <p className="text-calm-500 mt-1">{mockTherapistPatients.length} patients under your care</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Alert Banner for Critical/High Risk */}
        {(criticalCount > 0 || highCount > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-error-50 border border-error-200 rounded-2xl flex items-center gap-4"
          >
            <AlertTriangle size={24} className="text-error-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-error-800">
                {criticalCount > 0 && `${criticalCount} Critical`} {highCount > 0 && `${highCount > 0 && criticalCount > 0 ? 'and ' : ''}${highCount} High`} risk patient{criticalCount + highCount > 1 ? 's' : ''} require immediate attention
              </p>
              <p className="text-xs text-error-600 mt-0.5">Review patient profiles and consider scheduling urgent sessions</p>
            </div>
            <Link to="/therapist/risk" className="text-sm text-error-700 font-medium hover:text-error-800">
              View Risk Alerts
            </Link>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-calm-100 rounded-2xl p-4 mb-6 sticky top-0 z-10 shadow-sm"
        >
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-64 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" />
              <input
                type="text"
                placeholder="Search by name or condition..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10 py-2.5 text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['All', 'Critical', 'High', 'Medium', 'Low'].map((risk) => (
                <button
                  key={risk}
                  onClick={() => setRiskFilter(risk)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    riskFilter === risk ? 'bg-primary-600 text-white' : 'bg-calm-100 text-calm-600 hover:bg-calm-200'
                  }`}
                >
                  {risk}
                </button>
              ))}
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-calm-200 text-calm-600 hover:bg-calm-50 transition-all text-sm"
            >
              <Filter size={14} />
              Filters
              <ChevronDown size={14} className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-calm-100"
            >
              <div className="flex flex-wrap gap-3">
                <div>
                  <label className="block text-xs font-medium text-calm-600 mb-1.5">Condition</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Anxiety', 'Depression', 'Stress', 'Burnout'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setConditionFilter(c)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                          conditionFilter === c ? 'bg-primary-600 text-white' : 'bg-calm-100 text-calm-600 hover:bg-calm-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Patient Grid */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPatients.map((patient) => (
            <motion.div key={patient.id} variants={fadeInUp}>
              <Link to={`/therapist/patients/${patient.id}`} className="block">
                <div className={`card hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${
                  patient.riskLevel === 'Critical' ? 'border-error-300 bg-error-50/30' : ''
                }`}>
                  <div className="flex items-start gap-4 mb-4">
                    <img src={patient.avatar} alt={patient.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-calm-900">{patient.name}</h3>
                          <p className="text-sm text-calm-500">{patient.condition}</p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${riskColors[patient.riskLevel as keyof typeof riskColors]}`}>
                          {patient.riskLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-calm-400">
                        <Clock size={12} />
                        <span>Last active: {patient.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-calm-500">Treatment Progress</span>
                      <span className={`font-medium ${patient.progress > 0 ? 'text-success-600' : 'text-error-600'}`}>
                        {patient.progress > 0 ? `+${patient.progress}%` : `${patient.progress}%`}
                      </span>
                    </div>
                    <div className="h-2 bg-calm-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${patient.progress > 20 ? 'bg-success-500' : patient.progress > 0 ? 'bg-warning-500' : 'bg-error-500'}`}
                        style={{ width: `${Math.max(0, patient.progress) + 20}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-calm-100">
                    <div className="text-center">
                      <p className="text-lg font-bold text-calm-800">{patient.sessionsCompleted}</p>
                      <p className="text-xs text-calm-400">Sessions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-calm-800">{patient.journalEntries}</p>
                      <p className="text-xs text-calm-400">Journals</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {patient.progress > 0 ? (
                          <TrendingUp size={14} className="text-success-500" />
                        ) : (
                          <Activity size={14} className="text-error-500" />
                        )}
                        <span className="text-lg font-bold text-calm-800">
                          {patient.progress > 0 ? `+${patient.progress}` : patient.progress}
                        </span>
                      </div>
                      <p className="text-xs text-calm-400">Progress</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-calm-100">
                    <div className="text-xs text-calm-500">
                      Next: <span className="font-medium text-calm-700">{patient.nextSession}</span>
                    </div>
                    <ChevronRight size={16} className="text-calm-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="text-calm-300 mx-auto mb-4" />
            <p className="text-calm-500">No patients found matching your criteria</p>
            <button
              onClick={() => { setSearch(''); setRiskFilter('All'); setConditionFilter('All'); }}
              className="mt-3 text-primary-600 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
