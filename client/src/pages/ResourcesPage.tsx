import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Search, BookOpen, Video, FileText, Eye, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { mockResources } from '../data/mockData';

const categories = ['All', 'Anxiety', 'Depression', 'Stress Management', 'Sleep', 'Relationships', 'Self-Discovery'];
const types = ['All', 'article', 'video', 'guide'];
const typeLabels: Record<string, string> = { article: 'Article', video: 'Video', guide: 'Guide', All: 'All' };
const typeIcons: Record<string, LucideIcon> = { article: BookOpen, video: Video, guide: FileText };

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

export default function ResourcesPage() {
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = mockResources.filter((r) => { const matchCat = category === 'All' || r.category === category; const matchType = type === 'All' || r.type === type; const matchSearch = r.title.includes(search) || r.description.includes(search); return matchCat && matchType && matchSearch; });
  const featured = filtered.filter((r) => r.featured);
  const regular = filtered.filter((r) => !r.featured);

  return (
    <div className="bg-calm-50 min-h-screen">
      <Navbar isLoggedIn />
      <section className="pt-24 pb-10 bg-white border-b border-calm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="badge-primary mb-3 w-fit">Learning Resources</motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl font-bold text-calm-900 mb-3">Mental Wellness Library</motion.h1>
            <motion.p variants={fadeInUp} className="text-calm-500 mb-6">Articles, videos, and guides for your wellness journey</motion.p>
            <motion.div variants={fadeInUp} className="relative max-w-md"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" /><input type="text" placeholder="Search resources..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10 py-2.5" /></motion.div>
          </motion.div>
        </div>
      </section>

      <div className="bg-white border-b border-calm-100 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-3 flex-wrap">
          <div className="flex gap-2 overflow-x-auto">{categories.map((c) => (<button key={c} onClick={() => setCategory(c)} className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${category === c ? 'bg-primary-600 text-white' : 'bg-calm-100 text-calm-600 hover:bg-calm-200'}`}>{c}</button>))}</div>
          <div className="flex gap-2 ml-auto">{types.map((t) => (<button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${type === t ? 'bg-teal-600 text-white' : 'bg-calm-100 text-calm-600 hover:bg-calm-200'}`}>{typeLabels[t]}</button>))}</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {featured.length > 0 && (<div className="mb-10"><h2 className="text-lg font-bold text-calm-800 mb-5">Featured Content</h2><motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{featured.map((r) => { const TypeIcon = typeIcons[r.type]; return (<motion.div key={r.id} variants={fadeInUp}><div className="bg-white rounded-2xl border border-calm-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden cursor-pointer"><div className="relative"><img src={r.image} alt={r.title} className="w-full h-40 object-cover" /><div className="absolute top-3 left-3"><span className="badge bg-primary-600 text-white text-xs"><TypeIcon size={10} />{typeLabels[r.type]}</span></div><div className="absolute top-3 right-3 badge bg-warning-100 text-warning-700 text-xs">Featured</div></div><div className="p-5"><span className="text-xs text-primary-600 font-medium">{r.category}</span><h3 className="font-bold text-calm-900 mt-1 mb-2 line-clamp-2">{r.title}</h3><p className="text-sm text-calm-500 line-clamp-2 mb-3">{r.description}</p><div className="flex items-center justify-between text-xs text-calm-400"><div className="flex items-center gap-1"><Clock size={12} />{r.readTime}</div><div className="flex items-center gap-1"><Eye size={12} />{r.views.toLocaleString()} views</div></div></div></div></motion.div>); })}</motion.div></div>)}
        {regular.length > 0 && (<div><h2 className="text-lg font-bold text-calm-800 mb-5">All Resources</h2><motion.div variants={stagger} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{regular.map((r) => { const TypeIcon = typeIcons[r.type]; return (<motion.div key={r.id} variants={fadeInUp}><div className="bg-white rounded-2xl border border-calm-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden cursor-pointer"><div className="relative"><img src={r.image} alt={r.title} className="w-full h-32 object-cover" /><div className="absolute top-2 left-2"><span className="badge bg-white/90 backdrop-blur-sm text-calm-700 text-xs shadow-sm"><TypeIcon size={10} />{typeLabels[r.type]}</span></div></div><div className="p-4"><span className="text-xs text-teal-600 font-medium">{r.category}</span><h3 className="text-sm font-bold text-calm-900 mt-1 mb-2 line-clamp-2">{r.title}</h3><div className="flex items-center justify-between text-xs text-calm-400"><div className="flex items-center gap-1"><Clock size={11} />{r.readTime}</div><div className="flex items-center gap-1"><Eye size={11} />{r.views.toLocaleString()}</div></div></div></div></motion.div>); })}</motion.div></div>)}
        {filtered.length === 0 && (<div className="text-center py-16"><BookOpen size={48} className="text-calm-300 mx-auto mb-4" /><p className="text-calm-500">No resources found</p><button onClick={() => { setCategory('All'); setType('All'); setSearch(''); }} className="mt-3 text-primary-600 text-sm">Clear filters</button></div>)}
      </div>
      <Footer />
    </div>
  );
}
