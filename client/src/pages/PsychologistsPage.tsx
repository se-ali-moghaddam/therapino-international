import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock, Globe, ChevronDown, CheckCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { mockPsychologists } from '../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const specialtyOptions = ['All', 'Anxiety', 'Depression', 'Trauma', 'Relationships', 'Child', 'Stress'];
const priceOptions = ['All', 'Under $120', '$120-$175', 'Above $175'];
const ratingOptions = ['All', '4.5+', '4.7+', '4.9+'];

export default function PsychologistsPage() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = mockPsychologists.filter((p) => {
    const matchSearch = p.name.includes(search) || p.specialties.some((s) => s.includes(search));
    const matchSpecialty = specialty === 'All' || p.specialties.includes(specialty);
    return matchSearch && matchSpecialty;
  });

  return (
    <div className="bg-calm-50 min-h-screen">
      <Navbar isLoggedIn />
      <section className="pt-24 pb-10 bg-white border-b border-calm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.div variants={fadeInUp} className="badge-teal mb-3 w-fit">Psychologists</motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl font-bold text-calm-900 mb-3">Mental Health Specialists</motion.h1>
            <motion.p variants={fadeInUp} className="text-calm-500">Choose from {mockPsychologists.length} licensed psychologists</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-calm-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-64 relative"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" /><input type="text" placeholder="Search by name or specialty..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10 py-2.5 text-sm" /></div>
            <div className="flex gap-2 overflow-x-auto">{specialtyOptions.map((s) => (<button key={s} onClick={() => setSpecialty(s)} className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${specialty === s ? 'bg-primary-600 text-white' : 'bg-calm-100 text-calm-600 hover:bg-calm-200'}`}>{s}</button>))}</div>
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-calm-200 text-calm-600 hover:bg-calm-50 transition-all text-sm"><Filter size={14} />Filters<ChevronDown size={14} className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} /></button>
          </div>
          {filtersOpen && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-calm-100 grid sm:grid-cols-3 gap-4"><div><label className="block text-xs font-medium text-calm-600 mb-2">Price</label><div className="flex flex-wrap gap-2">{priceOptions.map((p) => (<button key={p} className="text-xs bg-calm-100 text-calm-600 px-3 py-1.5 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors">{p}</button>))}</div></div><div><label className="block text-xs font-medium text-calm-600 mb-2">Rating</label><div className="flex flex-wrap gap-2">{ratingOptions.map((r) => (<button key={r} className="text-xs bg-calm-100 text-calm-600 px-3 py-1.5 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors">{r}</button>))}</div></div><div><label className="block text-xs font-medium text-calm-600 mb-2">Session Type</label><div className="flex flex-wrap gap-2">{['All', 'Online', 'In-Person'].map((t) => (<button key={t} className="text-xs bg-calm-100 text-calm-600 px-3 py-1.5 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors">{t}</button>))}</div></div></motion.div>)}
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-calm-500 mb-5">{filtered.length} psychologists found</p>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map((p) => (<motion.div key={p.id} variants={fadeInUp}><Link to={`/psychologists/${p.id}`} className="block"><div className="bg-white rounded-2xl border border-calm-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"><div className="p-5 pb-0"><div className="flex items-start gap-4"><div className="relative"><img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-2xl object-cover" />{p.verified && (<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center"><CheckCircle size={12} className="text-white" /></div>)}</div><div className="flex-1"><div className="flex items-start justify-between"><div><h3 className="font-bold text-calm-900">{p.name}</h3><p className="text-xs text-calm-500">{p.title}</p></div>{p.featured && (<span className="badge bg-warning-100 text-warning-700 text-xs">Featured</span>)}</div><div className="flex items-center gap-1.5 mt-1.5"><Star size={12} className="fill-warning-400 text-warning-400" /><span className="text-sm font-semibold text-calm-800">{p.rating}</span><span className="text-xs text-calm-400">({p.reviewCount} reviews)</span></div></div></div></div><div className="px-5 py-3 flex flex-wrap gap-1.5">{p.specialties.slice(0, 3).map((s) => (<span key={s} className="bg-primary-50 text-primary-600 text-xs px-2.5 py-1 rounded-full">{s}</span>))}</div><div className="px-5 pb-4 flex items-center justify-between text-xs text-calm-500"><div className="flex items-center gap-1"><Clock size={12} /><span>{p.experience} years</span></div><div className="flex items-center gap-1"><Globe size={12} /><span>{p.languages.join(', ')}</span></div></div><div className="border-t border-calm-100 px-5 py-3 flex items-center justify-between"><div><span className="text-sm font-bold text-calm-900">${p.sessionPrice}</span><span className="text-xs text-calm-400"> /session</span></div><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${p.availability === 'Available' ? 'bg-success-500' : 'bg-warning-400'}`} /><span className={`text-xs ${p.availability === 'Available' ? 'text-success-600' : 'text-warning-600'}`}>{p.availability}</span></div></div></div></Link></motion.div>))}</motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
