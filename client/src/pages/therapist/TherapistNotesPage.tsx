import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TherapistSidebar from '../../components/dashboard/TherapistSidebar';
import { mockSessionNotes } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function TherapistNotesPage() {
  const [selectedNote, setSelectedNote] = useState(mockSessionNotes[0]);

  return (
    <div className="min-h-screen bg-calm-50">
      <TherapistSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">Session Notes</h1>
            <p className="text-calm-500 mt-1">Document and track therapy session progress</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Notes List */}
            <div className="lg:col-span-1">
              <motion.div variants={fadeInUp} className="card">
                <h3 className="font-bold text-calm-900 mb-4">Recent Sessions</h3>
                <div className="space-y-2">
                  {mockSessionNotes.map((note) => (
                    <button
                      key={note.id}
                      onClick={() => setSelectedNote(note)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        selectedNote.id === note.id
                          ? 'bg-primary-50 border-2 border-primary-300'
                          : 'bg-calm-50 hover:bg-calm-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-calm-800 text-sm">{note.patientName}</p>
                          <p className="text-xs text-calm-500 mt-0.5">{note.date}</p>
                        </div>
                        <FileText size={16} className="text-calm-400" />
                      </div>
                    </button>
                  ))}
                </div>
                <Link
                  to="/therapist/patients"
                  className="flex items-center gap-2 mt-4 text-sm text-primary-600 hover:text-primary-700"
                >
                  <ArrowLeft size={14} /> View all patients
                </Link>
              </motion.div>
            </div>

            {/* Note Detail */}
            <div className="lg:col-span-2">
              {selectedNote && (
                <motion.div key={selectedNote.id} variants={fadeInUp} className="card">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-bold text-calm-900">Session Notes</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-calm-500">{selectedNote.patientName}</span>
                        <span className="text-xs text-calm-400">•</span>
                        <div className="flex items-center gap-1 text-xs text-calm-400">
                          <Calendar size={12} />
                          {selectedNote.date}
                        </div>
                      </div>
                    </div>
                    <button className="btn-secondary text-sm">Edit Notes</button>
                  </div>

                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="p-4 bg-calm-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText size={16} className="text-primary-600" />
                        <span className="text-sm font-semibold text-calm-800">Summary</span>
                      </div>
                      <p className="text-sm text-calm-600 leading-relaxed">{selectedNote.summary}</p>
                    </div>

                    {/* Progress */}
                    <div className="p-4 bg-success-50 border border-success-200 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={16} className="text-success-600" />
                        <span className="text-sm font-semibold text-success-800">Progress</span>
                      </div>
                      <p className="text-sm text-success-700 leading-relaxed">{selectedNote.progress}</p>
                    </div>

                    {/* Challenges */}
                    <div className="p-4 bg-warning-50 border border-warning-200 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-warning-600" />
                        <span className="text-sm font-semibold text-warning-800">Challenges</span>
                      </div>
                      <p className="text-sm text-warning-700 leading-relaxed">{selectedNote.challenges}</p>
                    </div>

                    {/* Wins */}
                    <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={16} className="text-teal-600" />
                        <span className="text-sm font-semibold text-teal-800">Wins</span>
                      </div>
                      <p className="text-sm text-teal-700 leading-relaxed">{selectedNote.wins}</p>
                    </div>

                    {/* Next Session Focus */}
                    <div className="p-4 bg-primary-50 border border-primary-200 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={16} className="text-primary-600" />
                        <span className="text-sm font-semibold text-primary-800">Next Session Focus</span>
                      </div>
                      <p className="text-sm text-primary-700 leading-relaxed">{selectedNote.nextFocus}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
