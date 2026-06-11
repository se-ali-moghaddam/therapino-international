import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClipboardList, Plus, CircleCheck as CheckCircle, Clock, Calendar, BookOpen, Wind, Moon, Activity, Heart } from 'lucide-react';
import TherapistSidebar from '../../components/dashboard/TherapistSidebar';
import { mockAssignments, mockTherapistPatients } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const assignmentTypes = [
  { id: 'journal', label: 'Journaling', icon: BookOpen, color: 'bg-primary-100 text-primary-600' },
  { id: 'breathing', label: 'Breathing', icon: Wind, color: 'bg-teal-100 text-teal-600' },
  { id: 'meditation', label: 'Meditation', icon: Heart, color: 'bg-primary-100 text-primary-600' },
  { id: 'sleep', label: 'Sleep Routine', icon: Moon, color: 'bg-teal-100 text-teal-600' },
  { id: 'selfworth', label: 'Self-Worth', icon: Activity, color: 'bg-warning-100 text-warning-600' },
];

export default function TherapistAssignmentsPage() {
  const [filter, setFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');

  const filteredAssignments = mockAssignments.filter((a) => {
    if (filter === 'All') return true;
    if (filter === 'In Progress') return a.status === 'In Progress';
    if (filter === 'Completed') return a.status === 'Completed';
    return true;
  });

  const handleCreateAssignment = () => {
    if (selectedPatient && selectedType && assignmentTitle) {
      setShowCreateModal(false);
      setSelectedPatient('');
      setSelectedType('');
      setAssignmentTitle('');
      setAssignmentDescription('');
    }
  };

  return (
    <div className="min-h-screen bg-calm-50">
      <TherapistSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-calm-900">Patient Assignments</h1>
              <p className="text-calm-500 mt-1">Create and track therapeutic exercises for patients</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2">
              <Plus size={16} />
              New Assignment
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-4 gap-4 mb-6">
            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <ClipboardList size={18} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-calm-500">Total Active</p>
                  <p className="text-xl font-bold text-calm-900">{mockAssignments.length}</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning-100 flex items-center justify-center">
                  <Clock size={18} className="text-warning-600" />
                </div>
                <div>
                  <p className="text-xs text-calm-500">In Progress</p>
                  <p className="text-xl font-bold text-calm-900">{mockAssignments.filter(a => a.status === 'In Progress').length}</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                  <CheckCircle size={18} className="text-success-600" />
                </div>
                <div>
                  <p className="text-xs text-calm-500">Completed</p>
                  <p className="text-xl font-bold text-calm-900">{mockAssignments.filter(a => a.status === 'Completed').length}</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Activity size={18} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-calm-500">Avg Completion</p>
                  <p className="text-xl font-bold text-calm-900">72%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Filter */}
          <motion.div variants={fadeInUp} className="flex gap-2 mb-6">
            {['All', 'In Progress', 'Completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === f ? 'bg-primary-600 text-white' : 'bg-white text-calm-600 border border-calm-200 hover:border-primary-300'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Assignments Grid */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssignments.map((assignment) => (
              <motion.div key={assignment.id} variants={fadeInUp} className="card hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    assignment.type === 'Journaling' ? 'bg-primary-100' :
                    assignment.type === 'Breathing' ? 'bg-teal-100' :
                    assignment.type === 'Meditation' ? 'bg-primary-100' :
                    'bg-teal-100'
                  }`}>
                    {assignment.type === 'Journaling' && <BookOpen size={18} className="text-primary-600" />}
                    {assignment.type === 'Breathing' && <Wind size={18} className="text-teal-600" />}
                    {assignment.type === 'Meditation' && <Heart size={18} className="text-primary-600" />}
                    {assignment.type === 'Sleep Routine' && <Moon size={18} className="text-teal-600" />}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    assignment.status === 'Completed' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                  }`}>
                    {assignment.status}
                  </span>
                </div>

                <h3 className="font-bold text-calm-900 mb-1">{assignment.title}</h3>
                <p className="text-xs text-calm-500 mb-3">{assignment.patientName}</p>

                <p className="text-sm text-calm-600 mb-4 line-clamp-2">{assignment.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-calm-500">Progress</span>
                    <span className="font-medium text-calm-700">{assignment.progress}%</span>
                  </div>
                  <div className="h-2 bg-calm-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        assignment.progress >= 80 ? 'bg-success-500' : assignment.progress >= 50 ? 'bg-warning-500' : 'bg-primary-500'
                      }`}
                      style={{ width: `${assignment.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-calm-100 text-xs text-calm-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <Link to={`/therapist/patients/${assignment.patientId}`} className="text-primary-600 hover:text-primary-700 font-medium">
                    View Patient
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Create Assignment Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-calm-900/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white rounded-3xl shadow-xl w-full max-w-lg p-6 z-10"
              >
                <h2 className="text-lg font-bold text-calm-900 mb-6">Create New Assignment</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-calm-700 mb-1.5">Select Patient</label>
                    <select
                      value={selectedPatient}
                      onChange={(e) => setSelectedPatient(e.target.value)}
                      className="input-field"
                    >
                      <option value="">Choose patient...</option>
                      {mockTherapistPatients.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-calm-700 mb-1.5">Assignment Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {assignmentTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                              selectedType === type.id
                                ? 'border-primary-400 bg-primary-50'
                                : 'border-calm-200 hover:border-primary-200'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type.color}`}>
                              <Icon size={14} />
                            </div>
                            <span className="text-xs text-calm-700">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-calm-700 mb-1.5">Title</label>
                    <input
                      type="text"
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      placeholder="e.g., Daily Gratitude Journaling"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-calm-700 mb-1.5">Description</label>
                    <textarea
                      value={assignmentDescription}
                      onChange={(e) => setAssignmentDescription(e.target.value)}
                      placeholder="Instructions for the patient..."
                      className="input-field resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowCreateModal(false)} className="btn-secondary flex-1">
                    Cancel
                  </button>
                  <button onClick={handleCreateAssignment} className="btn-primary flex-1">
                    Create Assignment
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
