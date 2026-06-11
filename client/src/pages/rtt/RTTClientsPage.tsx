import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Clock, Calendar, TrendingUp, Brain, Activity } from 'lucide-react';
import RTTSidebar from '../../components/dashboard/RTTSidebar';
import { mockRTTClients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const statusColors = {
  'New': 'bg-primary-100 text-primary-700',
  'In Progress': 'bg-warning-100 text-warning-700',
  'Completing': 'bg-success-100 text-success-700',
};

export default function RTTClientsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredClients = mockRTTClients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dominantBelief.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50 to-teal-50">
      <RTTSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">RTT Clients</h1>
            <p className="text-calm-500 mt-1">Manage your Rapid Transformational Therapy clients</p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-calm-100 rounded-2xl p-4 mb-6 shadow-sm"
          >
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-64 relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" />
                <input
                  type="text"
                  placeholder="Search by name or belief..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10 py-2.5 text-sm"
                />
              </div>
              <div className="flex gap-2">
                {['All', 'New', 'In Progress', 'Completing'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      statusFilter === status ? 'bg-teal-600 text-white' : 'bg-calm-100 text-calm-600 hover:bg-calm-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Client Grid */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClients.map((client) => (
              <motion.div key={client.id} variants={fadeInUp}>
                <Link to={`/rtt/clients/${client.id}`} className="block">
                  <div className="bg-white rounded-2xl border border-calm-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <img src={client.avatar} alt={client.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-calm-900">{client.name}</h3>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[client.status as keyof typeof statusColors]}`}>
                            {client.status}
                          </span>
                        </div>
                        <p className="text-sm text-calm-500 mt-0.5">{client.sessionsCompleted}/{client.totalSessions} sessions</p>
                      </div>
                    </div>

                    {/* Dominant Belief */}
                    <div className="mb-4 p-3 bg-primary-50 rounded-xl border border-primary-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain size={14} className="text-primary-600" />
                        <p className="text-xs text-primary-700 font-medium">Dominant Belief</p>
                      </div>
                      <p className="text-sm font-semibold text-calm-800">"{client.dominantBelief}"</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-primary-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full" style={{ width: `${client.confidence}%` }} />
                        </div>
                        <span className="text-xs text-primary-600 font-medium">{client.confidence}%</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-calm-500">Overall Progress</span>
                        <span className="font-medium text-teal-600">{client.progress}%</span>
                      </div>
                      <div className="h-2 bg-calm-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-teal-400 to-primary-400 rounded-full" style={{ width: `${client.progress}%` }} />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center justify-between pt-4 border-t border-calm-100 text-xs text-calm-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>Last: {client.lastSession}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Next: {client.nextSession}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredClients.length === 0 && (
            <div className="text-center py-16">
              <Search size={48} className="text-calm-300 mx-auto mb-4" />
              <p className="text-calm-500">No clients found matching your criteria</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
