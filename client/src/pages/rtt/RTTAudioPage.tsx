import { motion } from 'framer-motion';
import { Headphones, Play, Clock, Star, Heart, Download, ListFilter as Filter } from 'lucide-react';
import RTTSidebar from '../../components/dashboard/RTTSidebar';
import { mockAudioPrograms } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const categories = ['All', 'Self-Worth', 'Confidence', 'Anxiety', 'Sleep', 'Stress'];

export default function RTTAudioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50 to-teal-50">
      <RTTSidebar />
      <div className="ml-64 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">RTT Audio Programs</h1>
            <p className="text-calm-500 mt-1">Transformational audio recordings for client reinforcement</p>
          </motion.div>

          {/* Category Filters */}
          <motion.div variants={fadeInUp} className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  cat === 'All' ? 'bg-teal-600 text-white' : 'bg-white text-calm-600 border border-calm-200 hover:border-teal-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured Program */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-teal-600 to-primary-700 rounded-2xl overflow-hidden mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6 text-white">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-4 inline-block">Featured Program</span>
                <h2 className="text-2xl font-bold mb-2">{mockAudioPrograms[0].title}</h2>
                <p className="text-teal-100 text-sm mb-4">{mockAudioPrograms[0].description}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm text-teal-200">
                    <Clock size={14} />
                    {mockAudioPrograms[0].duration}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-teal-200">
                    <Star size={14} className="fill-warning-300 text-warning-300" />
                    {mockAudioPrograms[0].rating}
                  </div>
                  <span className="text-sm text-teal-200">{mockAudioPrograms[0].plays.toLocaleString()} plays</span>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white text-teal-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-teal-50 transition-colors">
                    <Play size={18} /> Play Now
                  </button>
                  <button className="bg-white/20 text-white px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-white/30 transition-colors">
                    <Download size={18} /> Download
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img src={mockAudioPrograms[0].image} alt={mockAudioPrograms[0].title} className="w-full h-48 md:h-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Audio Programs Grid */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockAudioPrograms.slice(1).map((program) => (
              <motion.div key={program.id} variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="relative">
                  <img src={program.image} alt={program.title} className="w-full h-40 object-cover" />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Play size={24} className="text-teal-600 ml-1" />
                    </div>
                  </button>
                  <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs px-2.5 py-1 rounded-full">{program.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-calm-900 mb-2">{program.title}</h3>
                  <p className="text-sm text-calm-500 mb-4 line-clamp-2">{program.description}</p>
                  <div className="flex items-center justify-between text-xs text-calm-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock size={12} />{program.duration}</span>
                      <span className="flex items-center gap-1"><Star size={12} className="fill-warning-400 text-warning-400" />{program.rating}</span>
                    </div>
                    <span>{program.plays.toLocaleString()} plays</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Custom Program CTA */}
          <motion.div variants={fadeInUp} className="mt-8 bg-white rounded-2xl border border-calm-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-calm-900 mb-1">Create Custom Audio Program</h3>
                <p className="text-sm text-calm-500">Design personalized transformation audio for your clients</p>
              </div>
              <button className="btn-teal flex items-center gap-2">
                <Headphones size={16} /> Create Program
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
